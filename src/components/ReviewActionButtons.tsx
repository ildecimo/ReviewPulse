import { useState } from 'react';

import { type Review } from 'types';

import { Button } from '@bigcommerce/big-design';
import {
  CheckIcon,
  CloseIcon,
  NotificationsIcon,
} from '@bigcommerce/big-design-icons';

interface ReviewActionButtonProps {
  reviewId: number;
  productId: number;
  setReview: (review: Review) => void;
}

export const ApproveReviewButton = ({
  reviewId,
  productId,
  setReview,
}: ReviewActionButtonProps) => {
  const [isApproving, setIsApproving] = useState(false);

  const onApprove = () => {
    setIsApproving(true);
    fetch('/api/review-status/approve', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        reviewId,
      }),
    })
      .then((res) => res.json() as Promise<Review>)
      .then(setReview)
      .catch((err) => console.log(err))
      .finally(() => setIsApproving(false));
  };

  return (
    <Button
      iconLeft={<CheckIcon className="h-6 w-6" />}
      isLoading={isApproving}
      onClick={onApprove}
    >
      Approve
    </Button>
  );
};

export const DisapproveReviewButton = ({
  productId,
  reviewId,
  setReview,
}: ReviewActionButtonProps) => {
  const [isDisapproving, setIsDisapproving] = useState(false);

  const onDisapprove = () => {
    setIsDisapproving(true);
    fetch('/api/review-status/disapprove', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        reviewId,
      }),
    })
      .then((res) => res.json() as Promise<Review>)
      .then(setReview)
      .catch((err) => console.log(err))
      .finally(() => setIsDisapproving(false));
  };

  return (
    <Button
      iconLeft={<CloseIcon className="h-6 w-6" />}
      isLoading={isDisapproving}
      onClick={onDisapprove}
      actionType="destructive"
    >
      Disapprove
    </Button>
  );
};

export const PendingReviewButton = ({
  reviewId,
  productId,
  setReview,
}: ReviewActionButtonProps) => {
  const [isSettingPending, setIsSettingPending] = useState(false);

  const onPending = () => {
    setIsSettingPending(true);
    fetch('/api/review-status/pending', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        reviewId,
      }),
    })
      .then((res) => res.json() as Promise<Review>)
      .then(setReview)
      .catch((err) => console.log(err))
      .finally(() => setIsSettingPending(false));
  };

  return (
    <Button
      iconLeft={<NotificationsIcon className="h-6 w-6" />}
      isLoading={isSettingPending}
      onClick={onPending}
    >
      Set Pending
    </Button>
  );
};
