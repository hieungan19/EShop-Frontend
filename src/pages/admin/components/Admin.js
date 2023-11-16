import { CssBaseline, Grid } from '@mui/material';
import React from 'react';
import AdminSideBar from './sidebar/AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import Products from './products/Products';
import Home from './home/Home';
import Categories from './categories/Categories';
import Coupons from './coupons/Coupons';
import Orders from './orders/Orders';
const Admin = () => {
  return (
    <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
      <CssBaseline />
      <Grid item>
        <AdminSideBar />
      </Grid>
      <Grid item flexGrow={1}>
        <Routes>
          <Route path='home' element={<Home />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='categories' element={<Categories />}></Route>
          <Route path='coupons' element={<Coupons />}></Route>
          <Route path='orders' element={<Orders />}></Route>
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Admin;
