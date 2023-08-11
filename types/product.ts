export interface NewProduct {
  id: number;
  name: string;
}

export interface SimpleProduct extends NewProduct {
  type: string;
  condition: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  videosDescriptions: string;
  imagesDescriptions: string;
  thumbnailImage: string | undefined;
  reviews_rating_sum: number;
  reviews_count: number;
  total_sold: number;
  is_visible: boolean;
  custom_fields: { name: string; value: string }[];
}

export interface Product extends NewProduct {
  brand: string;
  type: string;
  condition: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  categoriesNames: string;
  videosDescriptions: string;
  imagesDescriptions: string;
  thumbnailImage: string;
  custom_fields: { name: string; value: string }[];
}
