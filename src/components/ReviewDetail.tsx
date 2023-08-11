'use client';
import { Link, Box, Tooltip } from '@bigcommerce/big-design';
import { type Review, type Product } from 'types';
import { convertToDateString } from '~/utils/utils';
import { StarRating } from './StarRating';
import { ReviewStatusBadge } from './ReviewStatusBadge';
import GaugeComponent from 'react-gauge-component';
import { Card } from './Card';

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
          <Card
            footer={
              review.text && (
                <div className="bg-gray-100/80 text-gray-800 text-lg px-3 py-2 rounded-md flex-1">
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
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-100/80 px-3 py-2 rounded-md">
                  <p className="text-sm mb-1 text-gray-600">Total orders</p>
                  <p className="text-2xl font-bold text-gray-800">17</p>
                </div>
                <div className="bg-gray-100/80 px-3 py-2 rounded-md">
                  <p className="text-sm mb-1 text-gray-600">Total spendings</p>
                  <p className="text-xl font-bold text-gray-800">$16430.00</p>
                </div>
                <div className="bg-gray-100/80 px-3 py-2 rounded-md">
                  <p className="text-sm mb-1 text-gray-600">Total reviews</p>
                  <p className="text-2xl font-bold text-gray-800">6</p>
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
                  <div className="cursor-help bg-green-200/80 text-green-800 w-9 aspect-square flex items-center justify-center rounded-full font-semibold">
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
          <div className="flex items-center space-x-6">
            <div className="w-1/3">
              <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg">
                <GaugeComponent
                  labels={{
                    valueLabel: { hide: true },
                    markLabel: {
                      hideMinMax: true,
                      valueConfig: { hide: true },
                    },
                  }}
                  arc={{ colorArray: ['#ea4228', '#f5cd19', '#5be12c'] }}
                  pointer={{ type: 'blob', width: 20 }}
                  type="semicircle"
                  value={66}
                />
              </div>
            </div>
            <div className="w-2/3">
              <h2 className="text-5xl font-bold text-yellow-400 mb-3">
                Neutral
              </h2>

              <p className="text-xl text-gray-700">
                AI: &quot;Suspendisse auctor eget sapien sit amet sagittis.
                Pellentesque sagittis tortor magna, eu efficitur purus maximus
                vel. Sed non odio dignissim, dignissim lectus ac, imperdiet
                quam&quot;
              </p>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
