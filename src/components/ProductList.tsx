'use client';

import { type SimpleProduct } from 'types';

import { Badge, Table } from '@bigcommerce/big-design';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Breadcrumbs } from '~/components/Breadcrumbs';
import { NextLink } from '~/components/NextLink';
import { ProductFilters } from '~/components/ProductFilters';
import { StarRating } from '~/components/StarRating';

import { ScoreCircle } from '~/components/ScoreCircle';
import { type AllReviewAnalysesResponse } from '~/lib/db';
import { convertToUDS } from '~/utils/utils';

interface ProductListProps {
  allAnalyses: AllReviewAnalysesResponse;
  products: SimpleProduct[];
}

interface ReviewsAverageProps {
  product: SimpleProduct;
}

const ReviewsAverage = ({ product }: ReviewsAverageProps) => {
  const { reviews_count, reviews_rating_sum } = product;

  if (reviews_count === 0) {
    return (
      <Badge label="no reviews" variant="warning">
        No Reviews
      </Badge>
    );
  }

  const average = reviews_rating_sum / reviews_count;

  return <StarRating rating={average} />;
};

const ProductList = ({ allAnalyses, products }: ProductListProps) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const sortedProductsByReviews = useMemo(
    () =>
      [...filteredProducts].sort((a, b) => {
        return b.reviews_count - a.reviews_count;
      }),
    [filteredProducts]
  );

  const productScoresById = products?.reduce(
    (acc, { id: productId }) => {
      const reviewAnalyses =
        allAnalyses?.filter((review) => review.productId === `${productId}`) ??
        [];

      const productScore = reviewAnalyses?.length
        ? Math.floor(
            reviewAnalyses.reduce(
              (acc, analysis) => acc + analysis.data.score,
              0
            ) / reviewAnalyses.length
          )
        : undefined;

      return {
        ...acc,
        [productId]: productScore,
      };
    },
    {} as Record<number, number>
  );

  return (
    <div>
      <Breadcrumbs>
        <Breadcrumbs.Text>All Products</Breadcrumbs.Text>
      </Breadcrumbs>

      <div className="my-6">
        <ProductFilters
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
      <div className="mt-10">
        <Table
          stickyHeader
          columns={[
            {
              header: 'Image',
              hash: 'image',
              render: (product) => (
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    alt={product.name}
                    className="object-cover object-center"
                    fill
                    src={
                      product.thumbnailImage ||
                      '/images/product-placeholder.png'
                    }
                  />
                </div>
              ),
            },
            {
              header: 'Name',
              hash: 'name',
              render: (product) => product.name,
            },
            {
              header: 'Score',
              hash: 'score',
              render: (product) => (
                <ScoreCircle
                  score={productScoresById[product.id]}
                  tooltip="Average product sentiment"
                />
              ),
            },
            {
              header: 'Price',
              hash: 'price',
              render: (product) => convertToUDS(product.price),
            },
            {
              header: 'Total Sold',
              hash: 'totalSold',
              render: (product) => product.total_sold,
            },
            {
              header: 'Visible',
              hash: 'visible',
              render: (product) =>
                product.is_visible ? (
                  <Badge label="yes" variant="success">
                    Yes
                  </Badge>
                ) : (
                  <Badge label="no" variant="danger">
                    No
                  </Badge>
                ),
            },
            {
              header: 'Approved Reviews',
              hash: 'approvedReviews',
              render: (product) => product.reviews_count,
            },
            {
              header: 'Approved Rating',
              hash: 'approvedRating',
              render: (product) => <ReviewsAverage product={product} />,
            },
            {
              header: 'Action',
              hash: 'action',
              render: (product) => (
                <NextLink href={`/product/${product.id}`}>
                  Explore <ArrowLongRightIcon className="ml-1 h-4 w-4" />
                </NextLink>
              ),
            },
          ]}
          items={sortedProductsByReviews}
        />
      </div>
    </div>
  );
};

export default ProductList;
