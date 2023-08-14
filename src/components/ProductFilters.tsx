import { useState } from 'react';
import { type SimpleProduct } from 'types';

import { Box, Form, FormGroup, Input, Switch } from '@bigcommerce/big-design';

interface ProductFiltersProps {
  setFilteredProducts: (value: SimpleProduct[]) => void;
  products: SimpleProduct[];
}

export const ProductFilters = ({
  setFilteredProducts,
  products,
}: ProductFiltersProps) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [subFilteredProducts, setSubFilteredProducts] = useState(products);

  const searchProduct = (search: string, products: SimpleProduct[]) => {
    return products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    const productsToFilter = switchOn ? subFilteredProducts : products;
    const filteredProducts = searchProduct(
      event.target.value,
      productsToFilter
    );

    setFilteredProducts(filteredProducts);
  };

  const handleSwitch = () => {
    setSwitchOn(!switchOn);
    const productsToFilter = searchValue ? subFilteredProducts : products;

    const filteredProducts = switchOn
      ? productsToFilter
      : productsToFilter.filter((product) => product.reviews_count > 0);

    setSubFilteredProducts(filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  return (
    <Box border="box" padding="small" borderRadius="normal">
      <Form>
        <FormGroup>
          <Input
            label="Search products by name"
            onChange={handleSearch}
            placeholder="Search"
            type="text"
            value={searchValue}
            required
          />
        </FormGroup>
      </Form>

      <div className="mt-4 flex">
        <span className="mr-6 font-bold">Show only products with reviews</span>
        <Switch onChange={handleSwitch} checked={switchOn} />
      </div>
    </Box>
  );
};
