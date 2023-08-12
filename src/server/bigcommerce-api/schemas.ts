import { z } from 'zod';

export const productSchema = z.object({
  data: z.object({
    name: z.string(),
    type: z.string(),
    condition: z.string(),
    weight: z.number(),
    height: z.number(),
    width: z.number(),
    depth: z.number(),
    videos: z.array(z.object({ description: z.string() })),
    images: z.array(
      z.object({
        description: z.string(),
        url_standard: z.string(),
        is_thumbnail: z.boolean(),
      })
    ),
    custom_fields: z.array(z.object({ name: z.string(), value: z.string() })),
    brand_id: z.number().optional(),
    categories: z.array(z.number()),
  }),
});

export const productsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      type: z.string(),
      condition: z.string(),
      weight: z.number(),
      height: z.number(),
      width: z.number(),
      depth: z.number(),
      reviews_rating_sum: z.number(),
      reviews_count: z.number(),
      total_sold: z.number(),
      is_visible: z.boolean(),
      price: z.number(),
      videos: z.array(z.object({ description: z.string() })),
      images: z.array(
        z.object({
          description: z.string(),
          url_standard: z.string(),
          is_thumbnail: z.boolean(),
        })
      ),
      custom_fields: z.array(z.object({ name: z.string(), value: z.string() })),
      brand_id: z.number().optional(),
      categories: z.array(z.number()),
    })
  ),
});

export const categorySchema = z.object({
  data: z.array(z.object({ name: z.string() })),
});

export const brandSchema = z.object({
  data: z.object({ name: z.string().optional() }),
});

export const reviewObjectSchema = z.object({
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
});

export const reviewSchema = z.object({
  data: reviewObjectSchema,
  meta: z.object({}),
});

export const reviewsSchema = z.object({
  data: z.array(reviewObjectSchema),
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

export const orderSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  date_created: z.string(),
  date_modified: z.string(),
  date_shipped: z.string(),
  status_id: z.number(),
  status: z.string(),
  subtotal_ex_tax: z.string(),
  subtotal_inc_tax: z.string(),
  subtotal_tax: z.string(),
  base_shipping_cost: z.string(),
  shipping_cost_ex_tax: z.string(),
  shipping_cost_inc_tax: z.string(),
  shipping_cost_tax: z.string(),
  shipping_cost_tax_class_id: z.number(),
  base_handling_cost: z.string(),
  handling_cost_ex_tax: z.string(),
  handling_cost_inc_tax: z.string(),
  handling_cost_tax: z.string(),
  handling_cost_tax_class_id: z.number(),
  base_wrapping_cost: z.string(),
  wrapping_cost_ex_tax: z.string(),
  wrapping_cost_inc_tax: z.string(),
  wrapping_cost_tax: z.string(),
  wrapping_cost_tax_class_id: z.number(),
  total_ex_tax: z.string(),
  total_inc_tax: z.string(),
  total_tax: z.string(),
  items_total: z.number(),
  items_shipped: z.number(),
  payment_method: z.string(),
  payment_provider_id: z.string().nullable(),
  payment_status: z.string(),
  refunded_amount: z.string(),
  order_is_digital: z.boolean(),
  store_credit_amount: z.string(),
  gift_certificate_amount: z.string(),
  ip_address: z.string(),
  ip_address_v6: z.string(),
  geoip_country: z.string(),
  geoip_country_iso2: z.string(),
  currency_id: z.number(),
  currency_code: z.string(),
  currency_exchange_rate: z.string(),
  default_currency_id: z.number(),
  default_currency_code: z.string(),
  staff_notes: z.string(),
  customer_message: z.string(),
  discount_amount: z.string(),
  coupon_discount: z.string(),
  shipping_address_count: z.number(),
  is_deleted: z.boolean(),
  ebay_order_id: z.string(),
  cart_id: z.string(),
  billing_address: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    street_1: z.string(),
    street_2: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
    country_iso2: z.string(),
    phone: z.string(),
    email: z.string(),
    form_fields: z.array(z.unknown()),
  }),
  is_email_opt_in: z.boolean(),
  credit_card_type: z.string().nullable(),
  order_source: z.string(),
  channel_id: z.number(),
  external_source: z.string().nullable(),
  consignments: z.object({ url: z.string(), resource: z.string() }),
  products: z.object({ url: z.string(), resource: z.string() }),
  shipping_addresses: z.object({ url: z.string(), resource: z.string() }),
  coupons: z.object({ url: z.string(), resource: z.string() }),
  external_id: z.null(),
  external_merchant_id: z.null(),
  tax_provider_id: z.string(),
  customer_locale: z.string(),
  external_order_id: z.string(),
  store_default_currency_code: z.string(),
  store_default_to_transactional_exchange_rate: z.string(),
  custom_status: z.string(),
});

export const ordersSchema = z.array(orderSchema);

export type Orders = Zod.infer<typeof ordersSchema>;
