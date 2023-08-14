import { Button } from '@bigcommerce/big-design';
import { EnvelopeIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { type Review } from 'types';
import { type GenerateEmailOutputOptions } from '~/server/google-ai/generate-email';

interface GenerateEmailButtonProps {
  variant: 'thank-you' | 'follow-up';
  review: Review;
}

export const GenerateEmailButton = ({
  variant,
  review,
}: GenerateEmailButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const isThankYou = variant === 'thank-you';

  const handleGenerateEmail = () => {
    console.log('Generating email...');

    setIsGenerating(true);
    fetch('/api/generate-email', {
      method: 'POST',
      body: JSON.stringify({
        review,
        emailType: isThankYou ? 'thank-you' : 'follow-up',
      }),
    })
      .then((res) => res.json() as Promise<GenerateEmailOutputOptions>)
      .then((res) => {
        const { body, subject } = res;

        if (body && subject) {
          window.open(
            `mailto:${review.email}?subject=${subject}&body=${body}`,
            '_blank'
          );
        } else {
          console.warn('Email not generated!', res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsGenerating(false));
  };

  return (
    <Button
      iconLeft={
        isThankYou ? (
          <HeartIcon className="h-6 w-6" />
        ) : (
          <EnvelopeIcon className="h-6 w-6" />
        )
      }
      variant="secondary"
      onClick={handleGenerateEmail}
      isLoading={isGenerating}
    >
      {isThankYou ? 'Thank You Email' : 'Follow Up Email'}
    </Button>
  );
};
