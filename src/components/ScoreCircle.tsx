import { Tooltip } from '@bigcommerce/big-design';
import clsx from 'clsx';
import { forwardRef, type ComponentProps } from 'react';
import { parseScore } from '~/utils/utils';

interface ScoreCircleBaseProps {
  className?: string;
  score?: number;
}

const ScoreCircleBase = forwardRef<HTMLDivElement, ScoreCircleBaseProps>(
  ({ className, score: scoreProp, ...props }, ref) => {
    const score = parseScore(scoreProp);

    return (
      <div
        {...props}
        className={clsx(
          'flex aspect-square w-9 items-center justify-center rounded-full font-semibold',
          {
            'bg-green-200/80 text-green-800': score.isPositive,
            'bg-yellow-200/80 text-yellow-800': score.isNeutral,
            'bg-red-200/80 text-red-800': score.isNegative,
            'bg-gray-200/80 text-gray-500': score.isNull,
          },
          className
        )}
        ref={ref}
      >
        {score.isNull ? '?' : scoreProp}
      </div>
    );
  }
);

ScoreCircleBase.displayName = 'ScoreCircleBase';

interface ScoreCircleProps extends Omit<ScoreCircleBaseProps, 'className'> {
  tooltip?: React.ReactNode;
  tooltipPlacement?: ComponentProps<typeof Tooltip>['placement'];
}

export const ScoreCircle = ({
  score,
  tooltip,
  tooltipPlacement = 'bottom',
}: ScoreCircleProps) => {
  if (tooltip) {
    return (
      <Tooltip
        placement={tooltipPlacement}
        trigger={<ScoreCircleBase className="cursor-help" score={score} />}
      >
        {tooltip}
      </Tooltip>
    );
  }

  return <ScoreCircleBase score={score} />;
};
