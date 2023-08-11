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
      <h2 className="text-2xl">Home Page TBD</h2>

      <span className="my-4 max-w-[350px] rounded-md border bg-orange-100 p-2 text-center">
        Accessing the products page for the first time without visiting the
        product review through the app extension will result in access token
        error.
      </span>
      <div className="mt-4">
        <NextLink href="/products">All Products</NextLink>
      </div>
    </Flex>
  );
};
