import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import {
  fetchProductWithAttributes,
  fetchReviews,
} from '~/server/bigcommerce-api';

import { ProductReviewList } from '~/components/ProductReviewList';

interface PageProps {
  params: { productId: string };
}

export default async function Page(props: PageProps) {
  const { productId } = props.params;

  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const id = Number(productId);

  const product = await fetchProductWithAttributes(
    id,
    accessToken,
    authorized.storeHash
  );

  const reviews = await fetchReviews(id, accessToken, authorized.storeHash);

  return (
    <div>
      <ProductReviewList product={product} reviews={reviews} />
    </div>
  );
}
