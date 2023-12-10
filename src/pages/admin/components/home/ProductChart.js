import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { fetchDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';

export default function ProductChart() {
  const [products, setProducts] = React.useState([]);
  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({ url: 'report/product-sold' });
      setProducts(response.products);
    } catch (error) {
      toast.error('Thất bại.');
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Typography fontWeight={'bold'}>Thống kê sản phẩm bán chạy</Typography>
      {products.length !== 0 ? (
        <BarChart
          title='Thống kê sản phẩm bán chạy'
          xAxis={[
            {
              id: 'barCategories',
              data: products.map((p) => p.id),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: products.map((p) => p.quantitySold),
            },
          ]}
          width={500}
          height={300}
        />
      ) : null}
    </>
  );
}
