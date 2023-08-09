'use client';

import { H1 } from '@bigcommerce/big-design';

interface ProductReviewListProps {
  productName: string;
}

const ProductReviewList = ({ productName }: ProductReviewListProps) => {
  return (
    <div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <H1>Reviews for - {productName}</H1>
      </div>
    </div>
  );
};

export default ProductReviewList;
