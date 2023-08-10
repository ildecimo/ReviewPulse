'use client';
import { Badge } from '@bigcommerce/big-design';
import { type Review } from 'types';

interface ReviewStatusBadgeProps {
  status: Review['status'];
}

export const ReviewStatusBadge = ({ status }: ReviewStatusBadgeProps) => {
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
