import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Slider } from '@mui/material';
import styles from './ProductFilter.module.scss';
import CategoryButton from './CategoryButton';
import { fetchDataAxios } from '../../api/customAxios';

const ProductFilter = ({ products, setFilterdProducts }) => {
  const [category, setCategory] = useState('All');
  const [allCategories, setAllCategories] = useState([]);
  const fetchCategories = async () => {
    const response = await fetchDataAxios({ url: 'categories' });
    setAllCategories(['All', ...response.categories.map((c) => c.name)]);
  };
  const [price, setPrice] = useState(0);

  const minPrice = 0; // Replace with your minimum price logic
  const [maxPrice, setMaxPrice] = useState(0); // Replace with your maximum price logic
  const findMinMaxPrice = (products) => {
    if (products.length === 0) {
      return { max: null };
    }

    return products.reduce(
      (acc, currentProduct) => {
        // So sánh giá cao nhất
        if (currentProduct.maxPrice > acc.max) {
          acc.max = currentProduct.maxPrice;
        }

        return acc;
      },
      { max: Number.MIN_VALUE }
    );
  };

  useEffect(() => {
    fetchCategories();
    const { max } = findMinMaxPrice(products);
    console.log(max);
    setMaxPrice(max);
    setPrice(max);
  }, [products]);

  const filterProducts = (cat) => {
    setCategory(cat);
    if (cat !== 'All')
      setFilterdProducts(
        products.filter(
          (product) =>
            product.category.name.toLowerCase().includes(cat.toLowerCase()) &&
            product.maxPrice <= price
        )
      );
    else {
      setFilterdProducts(products);
    }
  };

  const clearFilters = () => {
    setCategory('All');
    setPrice(maxPrice);
  };

  const handleChangePriceRange = (e) => {
    setPrice(e.target.value);

    if (category != 'All') {
      const temp = products.filter((product) =>
        product.category.name.toLowerCase().includes(category.toLowerCase())
      );
      setFilterdProducts(temp.filter((p) => p.maxPrice <= e.target.value));
    } else {
      setFilterdProducts(products.filter((p) => p.maxPrice <= e.target.value));
    }
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => (
          <CategoryButton
            key={index}
            cat={cat}
            filterProducts={filterProducts}
            activeCategory={category}
          />
        ))}
      </div>

      <h4>Price</h4>
      <p>{`0 - ${price}đ`}</p>
      <div className={styles.price}>
        <Slider
          sx={{ width: '80%' }}
          value={price}
          onChange={handleChangePriceRange}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <br />
    </div>
  );
};

export default ProductFilter;
