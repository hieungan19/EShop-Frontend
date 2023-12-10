import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { fetchDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';

export default function OrderStatusChart() {
  const [ordersStatus, setOrdersStatus] = React.useState({ ordersStatus: 0 });
  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({ url: 'report/order' });
      setOrdersStatus(response.statusCounts);
      console.log(response.statusCounts);
    } catch (error) {
      toast.error('Thất bại.');
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Typography fontWeight={'bold'}>Thống kê trạng thái đơn hàng</Typography>
      {ordersStatus ? (
        <BarChart
          title='Thống kê trạng thái đơn hàng'
          xAxis={[
            {
              id: 'barCategories',
              data: Object.keys(ordersStatus),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: Object.values(ordersStatus),
            },
          ]}
          width={500}
          height={300}
        />
      ) : null}
    </>
  );
}
