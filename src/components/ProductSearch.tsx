import { Form, FormGroup, Input } from '@bigcommerce/big-design';
import { useState } from 'react';

import { type SimpleProduct } from 'types';

interface ProductSearchProps {
  setFilteredProducts: (value: SimpleProduct[]) => void;
  products: SimpleProduct[];
}

export const ProductSearch = ({
  setFilteredProducts,
  products,
}: ProductSearchProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    const filteredProducts = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredProducts(filteredProducts);
  };

  return (
    <Form>
      <FormGroup>
        <Input
          label="Search products by name"
          onChange={handleChange}
          placeholder="Search"
          type="text"
          value={value}
          required
        />
      </FormGroup>
    </Form>
  );
};
