'use client';

import {
  StarBorderIcon,
  StarHalfIcon,
  StarIcon,
} from '@bigcommerce/big-design-icons';

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => {
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