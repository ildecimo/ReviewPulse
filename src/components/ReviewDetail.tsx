'use client';

import { Box } from '@bigcommerce/big-design';
import clsx from 'clsx';
import { useState } from 'react';
import GaugeComponent from 'react-gauge-component';

import { type Product, type Review } from 'types';
import { type Orders } from '~/server/bigcommerce-api/schemas';
import { type AnalyzeReviewOutputValues } from '~/server/google-ai/analyze-review';

import { AIChatBubble } from '~/components/AIChatBubble';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { Card } from '~/components/Card';
import { ComplimentBadges } from '~/components/ComplimentBadges';
import { GenerateEmailButton } from '~/components/GenerateEmailButton';
import { IssueBadges } from '~/components/IssueBadges';
import { OverrideActionsPopover } from '~/components/OverrideActionsPopover';
import {
  ApproveReviewButton,
  DisapproveReviewButton,
} from '~/components/ReviewActionButtons';
import { ReviewStatusBadge } from '~/components/ReviewStatusBadge';
import { ScoreCircle } from '~/components/ScoreCircle';
import { StarRating } from '~/components/StarRating';

import { convertToDateString, convertToUDS, parseScore } from '~/utils/utils';

interface ReviewDetailProps {
  customerOrders: Orders;
  customerReviews: Review[];
  product: Product;
  review: Review;
  sentimentAnalysis?: AnalyzeReviewOutputValues;
  userAverageScore?: number;
}

export const ReviewDetail = ({
  customerOrders,
  customerReviews,
  product,
  review: reviewProp,
  sentimentAnalysis,
  userAverageScore,
}: ReviewDetailProps) => {
  const [review, setReview] = useState(reviewProp);

  const totalCustomerSpendings = customerOrders.reduce(
    (acc, order) =>
      acc + parseInt(order.total_inc_tax) + parseInt(order.store_credit_amount),
    0
  );
  const formattedTotalSpendings = convertToUDS(totalCustomerSpendings);

  const sentimentScore = sentimentAnalysis?.score;
  const parsedScore = parseScore(sentimentScore);

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
            <ScoreCircle
              score={userAverageScore}
              tooltip="Average customer sentiment score"
            />
          }
        />
      </div>

      <div className="my-6 grid grid-cols-5 gap-4">
        <Box
          className="col-span-5 flex flex-col sm:col-span-3 lg:col-span-3 2xl:col-span-4"
          border="box"
          padding="small"
          borderRadius="normal"
        >
          <div className="flex">
            <h2 className="text-2xl font-semibold text-gray-600">
              Feedback and Suggestions
            </h2>
            <div className="ml-auto">
              <OverrideActionsPopover
                review={review}
                productId={product.id}
                setReview={setReview}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center pb-3 pt-4">
            <div className="space-y-3">
              <AIChatBubble message={sentimentAnalysis?.description} />

              <div className="w-[calc(100%-62px)]">
                <AIChatBubble
                  message={
                    <IssueBadges
                      issuesCategoriesArray={
                        sentimentAnalysis?.issueCategories ?? []
                      }
                    />
                  }
                  hideAvatar
                />
              </div>

              <div className="w-[calc(100%-62px)]">
                <AIChatBubble
                  message={
                    <ComplimentBadges
                      complimentCategoriesArray={
                        sentimentAnalysis?.complimentCategories ?? []
                      }
                    />
                  }
                  hideAvatar
                />
              </div>

              <div className="pl-16 pt-4">
                {review.status !== 'approved' &&
                  (parsedScore.isNeutral || parsedScore.isPositive) && (
                    <ApproveReviewButton
                      productId={product.id}
                      reviewId={review.id}
                      setReview={setReview}
                    />
                  )}

                {review.status !== 'disapproved' && parsedScore.isNegative && (
                  <DisapproveReviewButton
                    productId={product.id}
                    reviewId={review.id}
                    setReview={setReview}
                  />
                )}

                {parsedScore.isPositive && (
                  <GenerateEmailButton variant="thank-you" review={review} />
                )}

                {(parsedScore.isNeutral || parsedScore.isNegative) && (
                  <GenerateEmailButton variant="follow-up" review={review} />
                )}
              </div>
            </div>
          </div>
        </Box>

        <Box
          className="col-span-5 sm:col-span-2 lg:col-span-2 2xl:col-span-1"
          border="box"
          padding="small"
          borderRadius="normal"
        >
          <div className="mb-4">
            <h2 className="mb-3 text-2xl font-semibold text-gray-600">
              <span>Sentiment</span>{' '}
              <span
                className={clsx('rounded-md px-2 font-semibold capitalize', {
                  'bg-red-500 text-white': parsedScore.isNegative,
                  'bg-yellow-300 text-yellow-800': parsedScore.isNeutral,
                  'bg-green-500 text-white': parsedScore.isPositive,
                })}
              >
                {parsedScore.string.toLowerCase()}
              </span>
            </h2>

            <div className="max-w-xs rounded-lg border border-gray-100 bg-gray-50 pb-4 md:max-w-none">
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
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-600">
              Keywords
            </h3>

            <div className="flex flex-wrap items-baseline gap-2 text-lg">
              {sentimentAnalysis?.keywords?.map((keyword) => (
                <div
                  key={keyword}
                  className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 capitalize"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
