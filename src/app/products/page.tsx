import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import { fetchAllProducts } from '~/server/bigcommerce-api';

import ProductList from '~/components/ProductList';

export default async function Page() {
  const authorized = authorize();

  if (!authorized) {
    throw new Error('Token is not valid. Try to re-open the app.');
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    throw new Error('Access token not found. Try to re-install the app.');
  }

  const [products, allReviews] = await Promise.all([
    fetchAllProducts(accessToken, authorized.storeHash),
    db.getAllReviewAnalyses({ storeHash: authorized.storeHash }),
  ]);

  return <ProductList allAnalyses={allReviews ?? []} products={products} />;
}
