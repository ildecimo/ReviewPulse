'use client';
import { Link, Box } from '@bigcommerce/big-design';
import Image from 'next/image';
import { type Review, type Product } from 'types';
import { convertToDateString } from '~/utils/utils';
import { StarRating } from './StarRating';
import { ReviewStatusBadge } from './ReviewStatusBadge';

interface ReviewDetailProps {
  product: Product;
  review: Review;
}

export const ReviewDetail = ({ product, review }: ReviewDetailProps) => {
  return (
    <div>
      <div>
        <div>
          <Link href="/">All Products</Link> /{' '}
          <Link href={`/productReview/${product.id}`}>{product.name}</Link> /
          Review #{product.id}
        </div>

        <div className="my-12 grid grid-cols-2 gap-4">
          <Box border="box" padding="small" borderRadius="normal">
            <div className="flex">
              <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4">
                <Image
                  alt={product.name}
                  className="object-cover object-center"
                  fill
                  src={product.thumbnailImage}
                />
              </div>
              <div className="flex-1">
                <div className="flex mb-2">
                  <div>
                    <StarRating rating={review.rating} />

                    <h1 className="text-base my-0.5">{review.title}</h1>

                    <p className="text-sm mt-0 mb-2 text-gray-500">
                      {review.name}{' '}
                      {Boolean(review.email) && `(${review.email})`}
                    </p>
                  </div>

                  <div className="ml-auto pl-4">
                    <ReviewStatusBadge status={review.status} />
                  </div>
                </div>

                <div className="bg-gray-100/80 text-gray-800 px-3 py-2 rounded-md">
                  {review.text}
                </div>

                <p className="text-sm mt-2 mb-0 text-gray-500 text-right">
                  {convertToDateString(review.date_created)}
                </p>
              </div>
            </div>
          </Box>

          <Box border="box" padding="small" borderRadius="normal"></Box>
        </div>
      </div>
    </div>
  );
};
