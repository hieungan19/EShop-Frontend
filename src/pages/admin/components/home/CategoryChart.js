import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { fetchDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';

export default function CategoryChart() {
  const [categories, setCategories] = React.useState({ category: '' });
  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({ url: 'report/category' });
      console.log(categories);
      setCategories(response);
    } catch (error) {
      toast.error('Thất bại.');
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Typography fontWeight={'bold'}>
        Thống kê theo phân loại sản phẩm
      </Typography>
      {categories ? (
        <BarChart
          title='Thống kê theo phân loại sản phẩm'
          xAxis={[
            {
              id: 'barCategories',
              data: Object.keys(categories),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: Object.values(categories),
            },
          ]}
          width={500}
          height={300}
        />
      ) : null}
    </>
  );
}
