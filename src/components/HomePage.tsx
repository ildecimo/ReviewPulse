'use client';

import { Flex } from '@bigcommerce/big-design';
import { NextLink } from '~/components/NextLink';

export const HomePage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ minHeight: '90vh' }}
    >
      Home Page TBD
      <div className="mt-4">
        <NextLink href="/products">All Products</NextLink>
      </div>
    </Flex>
  );
};
