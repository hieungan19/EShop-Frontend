import React from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const currentProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 20,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageURL: 'https://placekitten.com/200/300', // Replace with your image URL
      inStock: true,
      rating: 4.5,
      numReviews: 10,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 30,
      description:
        'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
      imageURL: 'https://placekitten.com/200/301', // Replace with your image URL
      inStock: false,
      rating: 3.8,
      numReviews: 15,
    },
    // Add more products as needed
  ];
  return (
    <>
      {currentProducts.map((product) => {
        return (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        );
      })}
    </>
  );
};

export default ProductList;
