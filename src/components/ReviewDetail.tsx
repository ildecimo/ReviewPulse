'use client';
import { Box, Button, Tooltip } from '@bigcommerce/big-design';
import { CheckIcon, EnvelopeIcon, HeartIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import GaugeComponent from 'react-gauge-component';
import { type Product, type Review } from 'types';
import { convertToDateString } from '~/utils/utils';
import { Breadcrumbs } from './Breadcrumbs';
import { Card } from './Card';
import { ReviewStatusBadge } from './ReviewStatusBadge';
import { StarRating } from './StarRating';

interface ReviewDetailProps {
  product: Product;
  review: Review;
}

export const ReviewDetail = ({ product, review }: ReviewDetailProps) => {
  return (
    <div>
      <div>
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">All Products</Breadcrumbs.Link>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Link href={`/productReview/${product.id}`}>
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
                  <p className="text-2xl font-semibold text-gray-800">17</p>
                </div>
                <div className="rounded-md bg-gray-100/80 px-3 py-2">
                  <p className="mb-0.5 text-sm text-gray-600">
                    Total spendings
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    $16430.00
                  </p>
                </div>
                <div className="rounded-md bg-gray-100/80 px-3 py-2">
                  <p className="mb-0.5 text-sm text-gray-600">Total reviews</p>
                  <p className="text-2xl font-semibold text-gray-800">6</p>
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
                Overall ustomer sentiment score
              </Tooltip>
            }
          />
        </div>

        <Box>
          <div className="items-center space-y-6 md:flex md:space-x-6">
            <div className="md:w-1/3">
              <div className="flex items-center justify-center rounded-lg bg-gray-50 pb-4 md:aspect-square md:pb-0">
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
                  value={review.rating * 20}
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2
                // @todo: replace calc based on `review.rating` with AI result
                className={classNames('mb-3 text-3xl font-bold md:text-5xl', {
                  'text-red-500': review.rating < 2,
                  'text-yellow-300': review.rating >= 2 && review.rating < 4,
                  'text-green-500': review.rating >= 4,
                })}
              >
                {review.rating < 2 && 'Negative'}
                {review.rating >= 2 && review.rating < 4 && 'Neutral'}
                {review.rating >= 4 && 'Positive'}
              </h2>

              <p className="text-xl text-gray-800">
                AI: &quot;Suspendisse auctor eget sapien sit amet sagittis.
                Pellentesque sagittis tortor magna, eu efficitur purus maximus
                vel. Sed non odio dignissim, dignissim lectus ac, imperdiet
                quam&quot;
              </p>

              <div className="mt-8">
                <h3 className="mb-3 mt-0 text-lg font-medium text-gray-600">
                  Suggested Actions
                </h3>

                <div>
                  <Button
                    disabled={review.status === 'approved'}
                    iconLeft={<CheckIcon className="h-6 w-6" />}
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
          </div>
        </Box>
      </div>
    </div>
  );
};
