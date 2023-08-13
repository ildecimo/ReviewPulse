import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import {
  fetchCustomerOrders,
  fetchProductWithAttributes,
  fetchReview,
  fetchReviews,
} from '~/server/bigcommerce-api';

import { ReviewDetail } from '~/components/ReviewDetail';
import { analyzeReview } from '~/server/google-ai/analyze-review';

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

  const [product, review, reviews] = await Promise.all([
    fetchProductWithAttributes(productId, accessToken, authorized.storeHash),
    fetchReview(productId, reviewId, accessToken, authorized.storeHash),
    fetchReviews(productId, accessToken, authorized.storeHash),
  ]);

  const customerOrders = await fetchCustomerOrders({
    email: review.email,
    accessToken,
    storeHash: authorized.storeHash,
  });

  const customerReviews = reviews.filter((r) => r.email === review.email);

  let sentimentAnalysis = await db.getReviewAnalysis({
    productId,
    reviewId,
    storeHash: authorized.storeHash,
  });

  if (!sentimentAnalysis) {
    const freshAnalysis = await analyzeReview({
      rating: review.rating,
      text: review.text,
      title: review.title,
    });

    if (freshAnalysis && typeof freshAnalysis !== 'string') {
      sentimentAnalysis = freshAnalysis;

      await db.setReviewAnalysis({
        analysis: freshAnalysis,
        productId,
        reviewId,
        storeHash: authorized.storeHash,
      });
    }
  }

  return (
    <ReviewDetail
      sentimentAnalysis={
        !sentimentAnalysis || typeof sentimentAnalysis === 'string'
          ? undefined
          : sentimentAnalysis
      }
      customerOrders={customerOrders}
      customerReviews={customerReviews}
      product={product}
      review={review}
    />
  );
}
