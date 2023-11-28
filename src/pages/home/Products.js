import React, { useEffect, useState } from 'react';
import ProductList from '../../components/product/ProductList';
import { Box, Container, Grid, IconButton, TextField } from '@mui/material';
import ProductSort from '../../components/product-filter/ProductSort';
import SearchIcon from '@mui/icons-material/Search';
import ProductFilter from '../../components/product-filter/ProductFilter';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice';
import { fetchProducts } from '../admin/components/products/Products';
const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const fetchProductsAndDispatch = async () => {
    const response = await fetchProducts();
    if (response) {
      setProducts(response.products);
      dispatch(STORE_PRODUCTS({ products: response.products }));
    }
  };
  useEffect(() => {
    fetchProductsAndDispatch();
  }, []);
  return (
    <div>
      <Container>
        {/* Phần tiêu đề và nút Search, Sort */}
        <Box
          mt={3}
          mb={2}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <TextField
            label='Search Categories'
            variant='outlined'
            fullWidth
            margin='normal'
            // value={searchTerm}
            // onChange={handleSearchChange}
            sx={{ m: 0, p: 0 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <ProductSort />
        </Box>

        {/* Phần FilterProduct và danh sách sản phẩm */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ProductFilter />
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
