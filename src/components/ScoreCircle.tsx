import clsx from 'clsx';
import { parseScore } from '~/utils/utils';

interface ScoreCircleProps {
  score?: number;
}

export const ScoreCircle = ({ score: scoreProp }: ScoreCircleProps) => {
  const score = parseScore(scoreProp);

  return (
    <div
      className={clsx(
        'flex aspect-square w-9 items-center justify-center rounded-full font-semibold',
        {
          'bg-green-200/80 text-green-800': score.isPositive,
          'bg-yellow-200/80 text-yellow-800': score.isNeutral,
          'bg-red-200/80 text-red-800': score.isNegative,
          'bg-gray-200/80 text-gray-500': score.isNull,
        }
      )}
    >
      {score.isNull ? '?' : scoreProp}
    </div>
  );
};
