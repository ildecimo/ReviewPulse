'use client';

import { type SimpleProduct } from 'types';

import { Breadcrumbs } from '~/components/Breadcrumbs';

interface ProductListProps {
  products: SimpleProduct[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div>
      <Breadcrumbs>
        <Breadcrumbs.Text>All Products</Breadcrumbs.Text>
      </Breadcrumbs>
    </div>
  );
};

export default ProductList;
