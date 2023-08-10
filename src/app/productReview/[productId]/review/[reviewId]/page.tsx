import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import {
  fetchProductWithAttributes,
  fetchReview,
} from '~/server/bigcommerce-api';

import { ReviewDetail } from '~/components/ReviewDetail';

interface PageProps {
  params: { reviewId: string; productId: string };
}

export default async function Page(props: PageProps) {
  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const reviewId = Number(props.params.reviewId);
  const productId = Number(props.params.productId);

  const product = await fetchProductWithAttributes(
    productId,
    accessToken,
    authorized.storeHash
  );

  const review = await fetchReview(
    productId,
    reviewId,
    accessToken,
    authorized.storeHash
  );

  return (
    <div><ReviewDetail product={product} review={review} /></div>
  );
}
