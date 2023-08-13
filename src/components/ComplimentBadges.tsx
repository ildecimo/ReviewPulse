import { Badge } from '@bigcommerce/big-design';

interface ComplimentBadgesProps {
  complimentCategoriesArray?: string[];
}

export const ComplimentBadges = ({
  complimentCategoriesArray = [],
}: ComplimentBadgesProps) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="mr-2">Compliments:</span>

      {complimentCategoriesArray.length > 0 ? (
        complimentCategoriesArray.map((compliment) => (
          <Badge key={compliment} label={compliment} variant="success" />
        ))
      ) : (
        <Badge label="No compliment" variant="warning" />
      )}
    </div>
  );
};
