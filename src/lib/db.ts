import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { z } from 'zod';
import { env } from '~/env.mjs';
import {
  AnalyzeReviewOutputValues,
  analyzeReviewOutputSchema,
} from '~/server/google-ai/analyze-review';

export interface UserData {
  email: string;
  username?: string;
}
export interface User {
  email: string;
  id: number;
  username?: string;
}

export interface AuthProps {
  access_token?: string;
  context: string;
  scope?: string;
  user: User;
}

const { FIRE_API_KEY, FIRE_DOMAIN, FIRE_PROJECT_ID } = env;

const firebaseConfig = {
  apiKey: FIRE_API_KEY,
  authDomain: FIRE_DOMAIN,
  projectId: FIRE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore data management functions

// Use setUser for storing global user data (persists between installs)
export async function setUser(user: User) {
  if (!user) return Promise.resolve();

  const { email, id, username } = user;
  const ref = doc(db, 'users', String(id));
  const data: UserData = { email };

  if (username) {
    data.username = username;
  }

  await setDoc(ref, data, { merge: true });
}

export async function setStore(props: AuthProps) {
  const {
    access_token: accessToken,
    context,
    scope,
    user: { id },
  } = props;
  // Only set on app install or update
  if (!accessToken || !scope) return null;

  const storeHash = context?.split('/')[1] || '';
  const ref = doc(db, 'store', storeHash);
  const data = { accessToken, adminId: id, scope };

  await setDoc(ref, data);
}

// User management for multi-user apps
// Use setStoreUser for storing store specific variables
export async function setStoreUser(session: AuthProps) {
  const {
    context,
    user: { id: userId },
  } = session;

  if (!userId) return null;

  const storeHash = context.split('/')[1];
  const documentId = `${userId}_${storeHash}`;
  const ref = doc(db, 'storeUsers', documentId);

  await setDoc(ref, { storeHash });
}

export async function deleteUser(storeHash: string, user: User) {
  const docId = `${user.id}_${storeHash}`;
  const ref = doc(db, 'storeUsers', docId);

  await deleteDoc(ref);
}

export async function getStoreToken(storeHash: string): Promise<string | null> {
  if (!storeHash) return null;
  const storeDoc = await getDoc(doc(db, 'store', storeHash));

  return storeDoc.data()?.accessToken;
}

export async function deleteStore(storeHash: string) {
  const ref = doc(db, 'store', storeHash);
  await deleteDoc(ref);
}

export async function getReviewAnalysis({
  productId,
  reviewId,
  storeHash,
}: {
  productId: number;
  reviewId: number;
  storeHash: string;
}): Promise<AnalyzeReviewOutputValues | null> {
  if (!storeHash) return null;

  const ref = doc(
    db,
    'reviewAnalysis',
    storeHash,
    'products',
    `${productId}`,
    'reviews',
    `${reviewId}`
  );

  const analysisDoc = await getDoc(ref);

  const parsedAnalysis = analyzeReviewOutputSchema.safeParse(
    analysisDoc.data()
  );

  if (!parsedAnalysis.success) {
    return null;
  }

  return parsedAnalysis.data;
}

export async function setReviewAnalysis({
  analysis,
  productId,
  reviewId,
  storeHash,
}: {
  analysis: AnalyzeReviewOutputValues;
  productId: number;
  reviewId: number;
  storeHash: string;
}) {
  if (!storeHash) return null;

  const productRef = doc(
    db,
    'reviewAnalysis',
    storeHash,
    'products',
    `${productId}`
  );

  const reviewRef = doc(productRef, 'reviews', `${reviewId}`);

  await Promise.all([
    // Empty product document so we can reference it as a collection in queries
    setDoc(productRef, {}),

    // @todo: include customerId in firestore
    setDoc(reviewRef, analysis),
  ]);
}

const reviewAnalysesByProductIdSchema = z.array(
  z.object({ id: z.string(), data: analyzeReviewOutputSchema })
);

export type ReviewAnalysesByProductIdResponse = Zod.infer<
  typeof reviewAnalysesByProductIdSchema
>;

export async function getReviewAnalysesByProductId({
  productId,
  storeHash,
}: {
  productId: number;
  storeHash: string;
}): Promise<ReviewAnalysesByProductIdResponse | null> {
  if (!storeHash) return null;

  const ref = collection(
    db,
    'reviewAnalysis',
    storeHash,
    'products',
    `${productId}`,
    'reviews'
  );

  const snapshot = await getDocs(ref);

  const parsedAnalyses = reviewAnalysesByProductIdSchema.safeParse(
    snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
  );

  if (!parsedAnalyses.success) {
    return null;
  }

  return parsedAnalyses.data;
}

const allReviewAnalysesSchema = z.array(
  z.object({
    productId: z.string(),
    reviewId: z.string(),
    data: analyzeReviewOutputSchema,
  })
);

export type AllReviewAnalysesResponse = Zod.infer<
  typeof allReviewAnalysesSchema
>;

export async function getAllReviewAnalyses({
  storeHash,
}: {
  storeHash: string;
}): Promise<AllReviewAnalysesResponse | null> {
  if (!storeHash) return null;

  const reviews: AllReviewAnalysesResponse = [];

  const productsRef = collection(db, 'reviewAnalysis', storeHash, 'products');
  const productsSnapshot = await getDocs(productsRef);

  for (const product of productsSnapshot.docs) {
    const reviewsRef = collection(product.ref, 'reviews');

    const reviewsSnapshot = await getDocs(reviewsRef);

    for (const review of reviewsSnapshot.docs) {
      reviews.push({
        data: review.data() as AllReviewAnalysesResponse[number]['data'],
        productId: product.id,
        reviewId: review.id,
      });
    }
  }

  return reviews;
}
