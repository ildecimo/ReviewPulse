'use client';

import { type SimpleProduct } from 'types';

import { Table } from '@bigcommerce/big-design';

import { Breadcrumbs } from '~/components/Breadcrumbs';
import { NextLink } from '~/components/NextLink';

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
