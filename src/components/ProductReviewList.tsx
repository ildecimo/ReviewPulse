'use client';

import { H1, Table } from '@bigcommerce/big-design';
import { type Review } from 'types';

interface ProductReviewListProps {
  productName: string;
  reviews: Review[];
}

const ProductReviewList = ({
  productName,
  reviews,
}: ProductReviewListProps) => {
  return (
    <div>
      <div>
        <div className="text-center">
          <H1>Reviews for - {productName}</H1>
        </div>
        <Table
          columns={[
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Message', hash: 'message', render: ({ text }) => text },
            {
              header: 'Rating',
              hash: 'rating',
              render: ({ rating }) => `${rating} / 5`,
            },
          ]}
          items={reviews}
          stickyHeader
        />
      </div>
    </div>
  );
};

export default ProductReviewList;
