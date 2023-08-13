import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import {
  fetchProductWithAttributes,
  fetchReviews,
} from '~/server/bigcommerce-api';

import { ProductReviewList } from '~/components/ProductReviewList';
import { getReviewAnalysesByProductId } from '~/lib/db';

interface PageProps {
  params: { productId: string };
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

  const productId = Number(props.params.productId);

  const [product, reviews, reviewAnalyses] = await Promise.all([
    fetchProductWithAttributes(productId, accessToken, authorized.storeHash),
    fetchReviews(productId, accessToken, authorized.storeHash),
    getReviewAnalysesByProductId({
      productId,
      storeHash: authorized.storeHash,
    }),
  ]);

  return (
    <div>
      <ProductReviewList
        product={product}
        reviews={reviews}
        reviewAnalyses={reviewAnalyses ?? []}
      />
    </div>
  );
}
