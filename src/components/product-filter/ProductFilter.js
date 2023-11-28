import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from '../../redux/slice/filterSlice';
import { Button, Slider } from '@mui/material';
import styles from './ProductFilter.module.scss';
import CategoryButton from './CategoryButton';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');

  const [price, setPrice] = useState(3000);
  const [products, setProducts] = useState([
    { id: 1, category: 'Electronics', brand: 'Sony', price: 1200 },
    { id: 2, category: 'Clothing', brand: 'Nike', price: 50 },
    { id: 3, category: 'Electronics', brand: 'Samsung', price: 900 },
    // Add more sample data as needed
  ]);
  const minPrice = 0; // Replace with your minimum price logic
  const maxPrice = 2000; // Replace with your maximum price logic

  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory('All');
    setPrice(maxPrice);
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
      <p>{`0 - ${price.toLocaleString()}đ`}</p>
      <div className={styles.price}>
        <Slider
          sx={{ width: '80%' }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <br />
      <Button variant='outlined' color='error' onClick={clearFilters}>
        Clear Filter
      </Button>
    </div>
  );
};

export default ProductFilter;
