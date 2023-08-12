'use client';

import { Box, Button, Tooltip } from '@bigcommerce/big-design';
import { CheckIcon, EnvelopeIcon, HeartIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import GaugeComponent from 'react-gauge-component';

import { type Product, type Review } from 'types';
import { type Orders } from '~/server/bigcommerce-api/schemas';

import { AIChatBubble } from '~/components/AIChatBubble';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { Card } from '~/components/Card';
import { IssuesBadges } from '~/components/IssueBadges';
import { ReviewStatusBadge } from '~/components/ReviewStatusBadge';
import { StarRating } from '~/components/StarRating';

import { type AnalyzeReviewOutputValues } from '~/server/google-ai/analyze-review';
import { convertToDateString, convertToUDS } from '~/utils/utils';

interface ReviewDetailProps {
  customerOrders: Orders;
  customerReviews: Review[];
  product: Product;
  review: Review;
  sentimentAnalysis?: AnalyzeReviewOutputValues;
}

enum Sentiment {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

const getSentimentString = (score: number) => {
  if (score < 33) return Sentiment.NEGATIVE;

  if (score >= 33 && score < 66) return Sentiment.NEUTRAL;

  return Sentiment.POSITIVE;
};

export const ReviewDetail = ({
  customerOrders,
  customerReviews,
  product,
  review: reviewProp,
  sentimentAnalysis,
}: ReviewDetailProps) => {
  const [review, setReview] = useState(reviewProp);

  const onApprove = () => {
    fetch('/api/approve-review', {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        reviewId: review.id,
      }),
    })
      .then((res) => res.json() as Promise<Review>)
      .then(setReview)
      .catch((err) => console.log(err));
  };

  const totalCustomerSpendings = customerOrders.reduce(
    (acc, order) =>
      acc + parseInt(order.total_inc_tax) + parseInt(order.store_credit_amount),
    0
  );
  const formattedTotalSpendings = convertToUDS(totalCustomerSpendings);

  const sentimentScore = sentimentAnalysis?.score ?? 0;
  const sentimentString = getSentimentString(sentimentScore);

  return (
    <div>
      <Breadcrumbs>
        <Breadcrumbs.Link href="/products">All Products</Breadcrumbs.Link>
        <Breadcrumbs.Divider />
        <Breadcrumbs.Link href={`/product/${product.id}`}>
          {product.name}
        </Breadcrumbs.Link>
        <Breadcrumbs.Divider />
        <Breadcrumbs.Text>Review #{review.id}</Breadcrumbs.Text>
      </Breadcrumbs>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <Card
          footer={
            review.text && (
              <div className="flex-1 rounded-md bg-gray-100/80 px-3 py-2 text-lg text-gray-800">
                {review.text}
              </div>
            )
          }
          image={{ alt: product.name, src: product.thumbnailImage }}
          topContent={
            <>
              <Card.Title>{review.title}</Card.Title>

              <StarRating rating={review.rating} />

              <Card.Subtitle>
                {convertToDateString(review.date_created)}
              </Card.Subtitle>
            </>
          }
          topRightContent={<ReviewStatusBadge status={review.status} />}
        />

        <Card
          footer={
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <div className="rounded-md bg-gray-100/80 px-3 py-2">
                <p className="mb-0.5 text-sm text-gray-600">Total orders</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {customerOrders.length}
                </p>
              </div>
              <div className="rounded-md bg-gray-100/80 px-3 py-2">
                <p className="mb-0.5 text-sm text-gray-600">Total spendings</p>
                <p className="text-xl font-semibold text-gray-800">
                  {formattedTotalSpendings}
                </p>
              </div>
              <div className="rounded-md bg-gray-100/80 px-3 py-2">
                <p className="mb-0.5 text-sm text-gray-600">Total reviews</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {customerReviews.length}
                </p>
              </div>
            </div>
          }
          image={{
            alt: review.name,
            src: `https://unavatar.io/${review.email}?fallback=https://source.boringavatars.com/beam/64?square`,
            unoptimized: true,
          }}
          topContent={
            <>
              <Card.Title>{review.name}</Card.Title>
              <Card.Subtitle>{review.email}</Card.Subtitle>
            </>
          }
          topRightContent={
            <Tooltip
              placement="bottom"
              trigger={
                <div className="flex aspect-square w-9 cursor-help items-center justify-center rounded-full bg-green-200/80 font-semibold text-green-800">
                  92
                </div>
              }
            >
              Overall customer sentiment score
            </Tooltip>
          }
        />
      </div>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <Box border="box" padding="small" borderRadius="normal">
          <h2 className="mb-3 text-2xl font-bold text-gray-600">
            <span>Sentiment: </span>
            <span
              className={clsx('capitalize', {
                'text-red-500': sentimentString === Sentiment.NEGATIVE,
                'text-yellow-300': sentimentString === Sentiment.NEUTRAL,
                'text-green-500': sentimentString === Sentiment.POSITIVE,
              })}
            >
              {sentimentString.toLowerCase()}
            </span>
          </h2>
          <div className="flex items-center justify-center rounded-lg bg-gray-50 pb-4">
            <GaugeComponent
              labels={{
                valueLabel: { hide: true },
                markLabel: {
                  hideMinMax: true,
                  valueConfig: { hide: true },
                },
              }}
              arc={{ colorArray: ['#ef4444', '#fde047', '#22c55e'] }}
              pointer={{ type: 'needle', color: '#9ca3af' }}
              type="semicircle"
              value={sentimentScore}
            />
          </div>
        </Box>
        <Box border="box" padding="small" borderRadius="normal">
          <div className="flex h-full flex-col items-center justify-center">
            <div>
              <AIChatBubble message={sentimentAnalysis?.description} />
              <div className="w-[calc(100%-62px)]">
                <AIChatBubble
                  message={
                    <IssuesBadges
                      issuesCategoriesArray={
                        sentimentAnalysis?.issueCategories ?? []
                      }
                    />
                  }
                  hideAvatar
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 mt-0 text-lg font-medium text-gray-600">
                Suggested Actions
              </h3>

              <div>
                <Button
                  disabled={review.status === 'approved'}
                  iconLeft={<CheckIcon className="h-6 w-6" />}
                  onClick={onApprove}
                >
                  Approve
                </Button>

                <Button
                  iconLeft={<HeartIcon className="h-6 w-6" />}
                  variant="secondary"
                >
                  Thank you email
                </Button>

                <Button
                  iconLeft={<EnvelopeIcon className="h-6 w-6" />}
                  variant="secondary"
                >
                  Follow-up email
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
