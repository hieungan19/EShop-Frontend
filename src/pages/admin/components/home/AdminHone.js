import React from 'react';
import OrderStatusChart from './OrderStatusChart';
import OrderChart from './OrderChart';
import CustomerPieChart from './CustomerPieChart';
import CategoryChart from './CategoryChart';
import ProductChart from './ProductChart';
import { Grid } from '@mui/material';

const AdminHone = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <CategoryChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductChart />
        </Grid>
      </Grid>
      <OrderChart />
      <Grid container>
        <Grid item xs={12} md={6}>
          <OrderStatusChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomerPieChart />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHone;
