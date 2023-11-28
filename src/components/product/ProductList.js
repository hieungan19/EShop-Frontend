import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';
import Pagination from '../pagination/Pagination';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const pageNumbers = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <Grid container spacing={1}>
      {currentProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
      <Grid item alignSelf={'center'} xs={12}>
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers}
          onPageChange={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
};

export default ProductList;
