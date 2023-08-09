'use client';

import React from 'react';
import { Text, Panel, H1, Box } from '@bigcommerce/big-design';
import Image from 'next/image';

const HomePage = () => (
  <Box
    marginHorizontal={{ mobile: 'none', tablet: 'xxxLarge' }}
    marginVertical={{ mobile: 'none', tablet: 'xxLarge' }}
  >
    <H1>Product description generator</H1>
    <Panel header="Generate text">
      <Text>
        Create eye-catching product descriptions in a flash with the Product
        Description Generator. Using the product information from your catalog,
        the generator creates product descriptions in limitless styles and
        voices designed to drive traffic to your storefront and generate sales.
      </Text>
      <Image
        src="images/example.svg"
        alt="Example"
        width={700}
        height={500}
        priority={true}
      />
      <Text>
        Open the existing product or create a new one. Click on the Generate
        text action and check the result.
      </Text>
    </Panel>
  </Box>
);

export default HomePage;
