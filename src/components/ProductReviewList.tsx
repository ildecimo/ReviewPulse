'use client';
import { useMemo } from 'react';
import { Table, Link, Box, H1 } from '@bigcommerce/big-design';
import Image from 'next/image';
import { type Review, type Product } from 'types';
import { convertToDateString } from '~/utils/utils';
import { StarRating } from './StarRating';
import { ReviewStatusBadge } from './ReviewStatusBadge';

interface ProductReviewListProps {
  product: Product;
  reviews: Review[];
}

export const ProductReviewList = ({ product, reviews }: ProductReviewListProps) => {
  const averageRating = useMemo(() => {
    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    );
  }, [reviews]);

  const approvedReviews = useMemo(() => {
    return reviews.filter((review) => review.status === 'approved');
  }, [reviews]);

  const averageApprovedRating = useMemo(() => {
    return (
      approvedReviews.reduce((acc, review) => acc + review.rating, 0) /
      approvedReviews.length
    );
  }, [approvedReviews]);

  return (
    <div>
      <div>
        <div>
          <Link href="/">All Products</Link> / {product.name}
        </div>
        <div className="my-12 flex justify-between items-end flex-wrap">
          <Box border="box" padding="small" borderRadius="normal">
            <div>
              <strong>Reviews:</strong>
              <span className="pl-2">{reviews.length}</span>
            </div>
            <div className="flex">
              <strong>Average Rating:</strong>
              <span className="pl-2">
                <StarRating rating={averageRating} />
              </span>
            </div>
            <div className="mt-4">
              <strong>Approved:</strong>
              <span className="pl-2">{approvedReviews.length}</span>
            </div>
            <div className="flex">
              <strong>Average Approved Rating:</strong>
              <span className="pl-2">
                <StarRating rating={averageApprovedRating} />
              </span>
            </div>
          </Box>

          <div>
            <H1>
              <strong>{product.name}</strong>
            </H1>
            <Image
              src={product.thumbnailImage}
              alt={product.name}
              width={300}
              height={300}
            />
          </div>
        </div>
        
        <Table
          columns={[
            {
              header: 'Rating',
              hash: 'rating',
              render: ({ rating }) => <StarRating rating={rating} />,
            },
            {
              header: 'Status',
              hash: 'status',
              render: ({ status }) => <ReviewStatusBadge status={status} />,
            },
            {
              header: 'Posted by',
              hash: 'name',
              render: ({ name, email }) => (
                <span>
                  {name}
                  <br />
                  <small>{email}</small>
                </span>
              ),
            },
            {
              header: 'Date',
              hash: 'date',
              render: ({ date_created }) => (
                <span>{convertToDateString(date_created)}</span>
              ),
            },
            {
              header: 'Action',
              hash: 'action',
              render: ({ id }) => (
                <Link href={`/productReview/${product.id}/review/${id}`}>AI Explore</Link>
              ),
            },
          ]}
          items={reviews}
          stickyHeader
        />
      </div>
    </div>
  );
};
