import { Box } from '@bigcommerce/big-design';
import Image, { type ImageProps } from 'next/image';

interface CardProps {
  footer?: React.ReactNode;
  image: Omit<ImageProps, 'className'>;
  topContent: React.ReactNode;
  topRightContent?: React.ReactNode;
}

export const Card = ({
  footer,
  image,
  topContent,
  topRightContent,
}: CardProps) => (
  <Box border="box" padding="small" borderRadius="normal">
    <div className="flex h-full flex-col space-y-3">
      <div className="flex">
        <div className="relative mr-3 h-16 w-16 overflow-hidden rounded-md">
          <Image
            {...image}
            alt={image.alt}
            className="object-cover object-center"
            fill
          />
        </div>
        <div className="flex-1">
          <div className="flex">
            <div>{topContent}</div>

            {topRightContent && (
              <div className="ml-auto pl-4">{topRightContent}</div>
            )}
          </div>
        </div>
      </div>

      {footer}
    </div>
  </Box>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="m-0 text-base font-semibold">{children}</h1>
);

const CardSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-0.5 text-sm text-gray-400">{children}</p>
);

Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
