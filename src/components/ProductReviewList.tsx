'use client';
import { type Product, type Review } from 'types';

import { Table } from '@bigcommerce/big-design';
import { BoltIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { Breadcrumbs } from '~/components/Breadcrumbs';
import { Card } from '~/components/Card';
import { NextLink } from '~/components/NextLink';
import { ReviewStatusBadge } from '~/components/ReviewStatusBadge';
import { StarRating } from '~/components/StarRating';

import { convertToDateString } from '~/utils/utils';

interface ProductReviewListProps {
  product: Product;
  reviews: Review[];
}

export const ProductReviewList = ({
  product,
  reviews,
}: ProductReviewListProps) => {
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
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">All Products</Breadcrumbs.Link>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Text>{product.name}</Breadcrumbs.Text>
        </Breadcrumbs>

        <div className="my-6">
          <Card
            image={{ alt: product.name, src: product.thumbnailImage }}
            topContent={
              <>
                <Card.Title>{product.name}</Card.Title>

                <div className="mt-2 space-y-2">
                  <div className="md:flex md:space-x-4">
                    <div>
                      <strong className="font-semibold text-gray-600">
                        Reviews:
                      </strong>
                      <span className="pl-2">{reviews.length}</span>
                    </div>

                    <div className="flex">
                      <strong className="font-semibold text-gray-600">
                        Average Rating:
                      </strong>
                      <span className="pl-2">
                        <StarRating rating={averageRating} />
                      </span>
                    </div>
                  </div>

                  <div className="md:flex md:space-x-4">
                    <div className="">
                      <strong className="font-semibold text-gray-600">
                        Approved:
                      </strong>
                      <span className="pl-2">{approvedReviews.length}</span>
                    </div>

                    <div className="flex">
                      <strong className="font-semibold text-gray-600">
                        Average Approved Rating:
                      </strong>
                      <span className="pl-2">
                        <StarRating rating={averageApprovedRating} />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            }
          />
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
                <NextLink href={`/productReview/${product.id}/review/${id}`}>
                  AI Explore <BoltIcon className="ml-1 h-4 w-4" />
                </NextLink>
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
