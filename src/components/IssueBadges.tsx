import { Badge } from '@bigcommerce/big-design';

interface IssuesBadgesProps {
  issuesCategoriesArray?: string[];
}

export const IssuesBadges = ({
  issuesCategoriesArray = [],
}: IssuesBadgesProps) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="mr-2">Issues found:</span>

      {issuesCategoriesArray.length > 0 ? (
        issuesCategoriesArray.map((issue) => (
          <Badge key={issue} label={issue} variant="warning" />
        ))
      ) : (
        <Badge label="No issues" variant="success" />
      )}
    </div>
  );
};
