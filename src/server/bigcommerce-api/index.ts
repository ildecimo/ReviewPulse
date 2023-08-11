import { type Product, type Review, type SimpleProduct } from 'types';
import {
  fetchBrand,
  fetchCategories,
  fetchProduct,
  fetchProductReview,
  fetchProductReviews,
  fetchProducts,
} from './client';

export const fetchProductWithAttributes = async (
  id: number,
  accessToken: string,
  storeHash: string
): Promise<Product> => {
  const product = await fetchProduct(id, accessToken, storeHash);

  const { categories, brand_id } = product;

  const [categoriesPromise, brandPromise] = await Promise.allSettled([
    fetchCategories(categories, accessToken, storeHash),
    brand_id ? fetchBrand(brand_id, accessToken, storeHash) : null,
  ]);

  const categoriesNames =
    categoriesPromise.status === 'fulfilled'
      ? categoriesPromise.value.join(',')
      : [];
  const brand = brandPromise.status === 'fulfilled' ? brandPromise.value : '';

  return { ...product, id, brand, categoriesNames } as Product;
};

export const fetchReviews = async (
  productId: number,
  accessToken: string,
  storeHash: string
): Promise<Review[]> => {
  const reviews = await fetchProductReviews(productId, accessToken, storeHash);

  return reviews;
};

export const fetchReview = async (
  productId: number,
  reviewId: number,
  accessToken: string,
  storeHash: string
): Promise<Review> => {
  const review = await fetchProductReview(
    productId,
    reviewId,
    accessToken,
    storeHash
  );

  return review;
};

export const fetchAllProducts = async (
  accessToken: string,
  storeHash: string
): Promise<SimpleProduct[]> => {
  const products = await fetchProducts(accessToken, storeHash);

  return products;
};
