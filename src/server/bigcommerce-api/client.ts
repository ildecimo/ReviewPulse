import { z } from 'zod';
import { BIGCOMMERCE_API_URL } from '~/constants';

const productSchema = z.object({
  data: z.object({
    name: z.string(),
    type: z.string(),
    condition: z.string(),
    weight: z.number(),
    height: z.number(),
    width: z.number(),
    depth: z.number(),
    videos: z.array(z.object({ description: z.string() })),
    images: z.array(z.object({ description: z.string(), url_standard: z.string(), is_thumbnail: z.boolean() })),
    custom_fields: z.array(z.object({ name: z.string(), value: z.string() })),
    brand_id: z.number().optional(),
    categories: z.array(z.number()),
  }),
});

const categorySchema = z.object({
  data: z.array(z.object({ name: z.string() })),
});

const brandSchema = z.object({
  data: z.object({ name: z.string().optional() }),
});

const reviewSchema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      text: z.string(),
      status: z.enum(['approved', 'pending', 'disapproved']),
      rating: z.number(),
      email: z.string(),
      name: z.string(),
      date_reviewed: z.string(),
      id: z.number(),
      date_created: z.string(),
      date_modified: z.string(),
    })
  ),
  meta: z.object({
    pagination: z.object({
      total: z.number(),
      count: z.number(),
      per_page: z.number(),
      current_page: z.number(),
      total_pages: z.number(),
      links: z.object({
        previous: z.string().optional(),
        current: z.string(),
        next: z.string().optional(),
      }),
    }),
  }),
});

const fetchFromBigCommerceApi = (
  path: string,
  accessToken: string,
  storeHash: string
) =>
  fetch(`${BIGCOMMERCE_API_URL}/stores/${storeHash}/v3${path}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-auth-token': accessToken,
    },
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
    `/catalog/products/${productId.toString()}?${params}`,
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
    thumbnailImage: images.find(({ is_thumbnail }) => is_thumbnail)?.url_standard,
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
    `/catalog/categories?${params}`,
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
    `/catalog/brands/${brandId}`,
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
    `/catalog/products/${productId}/reviews`,
    accessToken,
    storeHash
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const parsedReviews = reviewSchema.safeParse(await response.json());

  console.log(parsedReviews);

  if (!parsedReviews.success) {
    throw new Error('Failed to parse reviews');
  }

  console.log(parsedReviews);

  return parsedReviews.data.data;
}
