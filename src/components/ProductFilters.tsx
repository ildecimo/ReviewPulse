import { Box, Switch } from '@bigcommerce/big-design';
import { useState } from 'react';
import { type SimpleProduct } from 'types';

import { ProductSearch } from '~/components/ProductSearch';

interface ProductFiltersProps {
  setFilteredProducts: (value: SimpleProduct[]) => void;
  products: SimpleProduct[];
}

export const ProductFilters = ({
  setFilteredProducts,
  products,
}: ProductFiltersProps) => {
  const [switchOn, setSwitchOn] = useState(false);

  const handleSwitch = () => {
    setSwitchOn(!switchOn);
    let filteredProducts = products;

    if (!switchOn) {
      filteredProducts = products.filter((product) => {
        return product.reviews_count > 0;
      });
    }

    setFilteredProducts(filteredProducts);
  };

  return (
    <Box border="box" padding="small" borderRadius="normal">
      <ProductSearch
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      <div className="mt-4 flex">
        <span className="mr-6 font-bold">Show only products with reviews</span>
        <Switch onChange={handleSwitch} checked={switchOn} />
      </div>
    </Box>
  );
};
