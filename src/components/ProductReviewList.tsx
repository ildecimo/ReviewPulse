'use client';
import { useMemo } from "react";
import { H1, Table, Badge, Link, Box } from '@bigcommerce/big-design';
import {
  StarBorderIcon,
  StarHalfIcon,
  StarIcon,
} from '@bigcommerce/big-design-icons';
import { type Review } from 'types';
import { convertToDateString } from '~/utils/utils';

interface ProductReviewListProps {
  productName: string;
  reviews: Review[];
}

interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'disapproved';
}

interface ReviewRatingProps {
  rating: number;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variant =
    status === 'approved'
      ? 'success'
      : status === 'pending'
      ? 'warning'
      : 'danger';
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge label={label} variant={variant}>
      {status}
    </Badge>
  );
};

const ReviewRating = ({ rating }: ReviewRatingProps) => {
  const stars: React.JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating % 1);
  const emptyStars = 5 - fullStars - halfStars;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon color="warning50" size={'medium'} key={i} />);
  }

  if (halfStars) {
    stars.push(
      <StarHalfIcon color="warning50" size={'medium'} key={fullStars} />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <StarBorderIcon size={'medium'} key={fullStars + halfStars + i} />
    );
  }

  return <div className="flex">{stars}</div>;
};

const ProductReviewList = ({
  productName,
  reviews,
}: ProductReviewListProps) => {

  const averageRating = useMemo(() => {
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }
  , [reviews]);

  const approvedReviewsCount = useMemo(() => {
    return reviews.filter(review => review.status === 'approved').length;
  }
  , [reviews]);

  return (
    <div>
      <div>
        <div className="text-center">
          <H1>Reviews for - <strong>{productName}</strong></H1>
        </div>
        <div className="my-12">
          <Box border="box" padding="small" borderRadius="normal">
              <div>
                <strong>Reviews count:</strong><span className="pl-2">{reviews.length}</span>
              </div>
              <div>
                <strong>Approved:</strong><span className="pl-2">{approvedReviewsCount}</span>
              </div>
              <div className="flex">
                <strong>Average Rating:</strong><span className="pl-2"><ReviewRating rating={averageRating} /></span>
              </div>
          </Box>
        </div>
        <Table
          columns={[
            {
              header: 'Rating',
              hash: 'rating',
              render: ({ rating }) => <ReviewRating rating={rating} />,
            },
            {
              header: 'Status',
              hash: 'status',
              render: ({ status }) => <StatusBadge status={status} />,
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
              render: ({id}) => <Link href={`/review/${id}`}>Analyze</Link>,
            }
          ]}
          items={reviews}
          stickyHeader
        />
      </div>
    </div>
  );
};

export default ProductReviewList;
