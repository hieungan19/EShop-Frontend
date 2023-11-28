import { CssBaseline, Grid } from '@mui/material';
import React from 'react';
import AdminSideBar from './components/sidebar/AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import Products from './components/products/Products';
import Categories from './components/categories/Categories';
import Coupons from './components/coupons/Coupons';
import Orders from './components/orders/Orders';
import Customers from './components/customers/Customers';
import AdminHome from './components/home/AdminHone';
import CouponForm from './components/coupons/CouponFormModal';
const Admin = () => {
  return (
    <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
      <CssBaseline />
      <Grid item>
        <AdminSideBar />
      </Grid>
      <Grid item flexGrow={1}>
        <Routes>
          <Route path='home' element={<AdminHome />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='categories' element={<Categories />}></Route>
          <Route path='coupons' element={<Coupons />}></Route>
          <Route path='orders' element={<Orders />}></Route>
          <Route path='customers' element={<Customers />}></Route>
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Admin;
