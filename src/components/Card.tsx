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
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex">
        <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3">
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
  <h1 className="text-base m-0">{children}</h1>
);

const CardSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-400 mt-0.5">{children}</p>
);

Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
