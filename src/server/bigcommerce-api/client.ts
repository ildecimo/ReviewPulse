import { type Review } from 'types';
import { BIGCOMMERCE_API_URL } from '~/constants';
import {
  brandSchema,
  categorySchema,
  ordersSchema,
  productSchema,
  productsSchema,
  reviewSchema,
  reviewsSchema,
} from '~/server/bigcommerce-api/schemas';

const fetchFromBigCommerceApi = (
  path: string,
  accessToken: string,
  storeHash: string
) =>
  fetch(`${BIGCOMMERCE_API_URL}/stores/${storeHash}${path}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-auth-token': accessToken,
    },
  });

const updateBigCommerceApi = (
  path: string,
  accessToken: string,
  storeHash: string,
  body: string
) =>
  fetch(`${BIGCOMMERCE_API_URL}/stores/${storeHash}${path}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-auth-token': accessToken,
    },
    body,
  });

export async function fetchProduct(
  productId: number,
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    include: 'videos,images,custom_fields',
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/products/${productId.toString()}?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const parsedProductResponse = productSchema.safeParse(await response.json());

  if (!parsedProductResponse.success) {
    console.log(parsedProductResponse.error);
    throw new Error('Failed to parse product');
  }

  const { videos, images, ...restAttr } = parsedProductResponse.data.data;

  return {
    ...restAttr,
    videosDescriptions: videos.map(({ description }) => description).join(','),
    imagesDescriptions: images.map(({ description }) => description).join(','),
    thumbnailImage: images.find(({ is_thumbnail }) => is_thumbnail)
      ?.url_standard,
  };
}

export async function fetchCategories(
  categories: number[],
  accessToken: string,
  storeHash: string
) {
  const params = new URLSearchParams({
    'id:in': categories.join(','),
  }).toString();
  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/categories?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const parsedCategories = categorySchema.safeParse(await response.json());

  if (!parsedCategories.success) {
    throw new Error('Failed to parse categories');
  }

  return parsedCategories.data.data.map(({ name }) => name);
}

export async function fetchBrand(
  brandId: number,
  accessToken: string,
  storeHash: string
) {
  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/brands/${brandId}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch brand');
  }

  const parsedBrand = brandSchema.safeParse(await response.json());

  if (!parsedBrand.success) {
    throw new Error('Failed to parse brand');
  }

  return parsedBrand.data.data.name;
}

export async function fetchProductReviews(
  productId: number,
  accessToken: string,
  storeHash: string
) {
  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/products/${productId}/reviews`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const parsedReviews = reviewsSchema.safeParse(await response.json());

  if (!parsedReviews.success) {
    throw new Error('Failed to parse reviews');
  }

  return parsedReviews.data.data;
}

export async function fetchProductReview(
  productId: number,
  reviewId: number,
  accessToken: string,
  storeHash: string
) {
  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/products/${productId}/reviews/${reviewId}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch review');
  }

  const parsedReview = reviewSchema.safeParse(await response.json());

  if (!parsedReview.success) {
    throw new Error('Failed to parse review');
  }

  return parsedReview.data.data;
}

export async function fetchProducts(accessToken: string, storeHash: string) {
  const params = new URLSearchParams({
    include: 'videos,images,custom_fields',
  }).toString();

  const response = await fetchFromBigCommerceApi(
    `/v3/catalog/products?${params}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const parsedProducts = productsSchema.safeParse(await response.json());

  if (!parsedProducts.success) {
    throw new Error('Failed to parse products');
  }

  const cleanProducts = parsedProducts.data.data.map(
    ({ videos, images, ...restAttr }) => ({
      ...restAttr,
      videosDescriptions: videos
        .map(({ description }) => description)
        .join(','),
      imagesDescriptions: images
        .map(({ description }) => description)
        .join(','),
      thumbnailImage: images.find(({ is_thumbnail }) => is_thumbnail)
        ?.url_standard,
    })
  );

  return cleanProducts;
}

export async function updateProductReview({
  productId,
  reviewId,
  accessToken,
  storeHash,
  reviewData,
}: {
  productId: number;
  reviewId: number;
  accessToken: string;
  storeHash: string;
  reviewData: Partial<Review>;
}) {
  const response = await updateBigCommerceApi(
    `/v3/catalog/products/${productId}/reviews/${reviewId}`,
    accessToken,
    storeHash,
    JSON.stringify(reviewData)
  );

  if (!response.ok) {
    throw new Error('Failed to update review');
  }

  const review = (await response.json()) as Zod.infer<typeof reviewSchema>;

  return review.data;
}

export async function fetchCustomerOrders({
  email,
  accessToken,
  storeHash,
}: {
  email: string;
  accessToken: string;
  storeHash: string;
}) {
  const response = await fetchFromBigCommerceApi(
    `/v2/orders?email=${email}`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const parsedOrders = ordersSchema.safeParse(await response.json());

  if (!parsedOrders.success) {
    console.log(parsedOrders.error.issues[0]);
    throw new Error('Failed to parse orders');
  }

  return parsedOrders.data;
}
