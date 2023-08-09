'use client';

import { H1 } from '@bigcommerce/big-design';

interface ProductReviewListProps {
  productName: string;
}

const ProductReviewList = ({ productName }: ProductReviewListProps) => {
  return (
    <div>
      <H1>Reviews for - {productName}</H1>
    </div>
  );
};

export default ProductReviewList;
