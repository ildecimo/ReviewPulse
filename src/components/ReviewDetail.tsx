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
                    <h1 className="text-base mt-0 mb-0.5">{review.title}</h1>

                    <StarRating rating={review.rating} />

                    <p className="text-sm mt-0 text-gray-400">
                      {convertToDateString(review.date_created)}
                    </p>
                  </div>

                  <div className="ml-auto pl-4">
                    <ReviewStatusBadge status={review.status} />
                  </div>
                </div>

                <div className="bg-gray-100/80 text-gray-800 px-3 py-2 rounded-md">
                  {review.text}
                </div>
              </div>
            </div>
          </Box>

          <Box border="box" padding="small" borderRadius="normal">
            <div className="flex">
              <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4">
                <Image
                  alt={review.name}
                  className="object-cover object-center"
                  fill
                  src={`https://unavatar.io/${review.email}?fallback=https://source.boringavatars.com/beam`}
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <h2 className="text-base my-0.5">{review.name}</h2>

                  {Boolean(review.email) && (
                    <p className="text-sm mt-0 text-gray-500">{review.email}</p>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
