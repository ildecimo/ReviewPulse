import { useState } from 'react';

import { type Review } from 'types';

import { Button, Popover } from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';

import { GenerateEmailButton } from '~/components/GenerateEmailButton';
import {
  ApproveReviewButton,
  DisapproveReviewButton,
  PendingReviewButton,
} from '~/components/ReviewActionButtons';

interface OverrideActionsPopoverProps {
  review: Review;
  productId: number;
  setReview: (review: Review) => void;
}

export const OverrideActionsPopover = ({
  review,
  productId,
  setReview,
}: OverrideActionsPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  return (
    <div className="mb-2 flex">
      <Button
        variant="subtle"
        onClick={() => setIsOpen(true)}
        ref={setButtonRef}
      >
        <MoreHorizIcon />
      </Button>
      <Popover
        anchorElement={buttonRef}
        isOpen={isOpen}
        label="Example Popover"
        onClose={() => setIsOpen(false)}
      >
        <div className="mb-2">
          <GenerateEmailButton variant="thank-you" review={review} />
        </div>
        <div className="mb-2">
          <GenerateEmailButton variant="follow-up" review={review} />
        </div>
        <div className="mb-2">
          <ApproveReviewButton
            reviewId={review.id}
            productId={productId}
            setReview={setReview}
          />
        </div>
        <div className="mb-2">
          <PendingReviewButton
            reviewId={review.id}
            productId={productId}
            setReview={setReview}
          />
        </div>
        <div className="mb-2">
          <DisapproveReviewButton
            reviewId={review.id}
            productId={productId}
            setReview={setReview}
          />
        </div>
      </Popover>
    </div>
  );
};
