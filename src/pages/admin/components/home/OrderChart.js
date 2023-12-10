import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import { fetchDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';

export default function TickNumber() {
  const timeData = [
    new Date(2023, 0, 31),
    new Date(2023, 1, 28),
    new Date(2023, 2, 31),
    new Date(2023, 3, 30),
    new Date(2023, 4, 31),
    new Date(2023, 5, 30),
    new Date(2023, 6, 31),
    new Date(2023, 7, 31),
    new Date(2023, 8, 30),
    new Date(2023, 9, 31),
    new Date(2023, 10, 30),
    new Date(2023, 11, 31),
  ];
  const [quantity, setQuantity] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3,
  ]);
  const [revenue, setRevenue] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);

  const valueFormatter = (date) =>
    date.toLocaleDateString('fr-FR', {
      month: '2-digit',
      day: '2-digit',
    });

  const config = {
    series: [{ data: quantity }, { data: revenue }],
    height: 300,
    topAxis: 'months',
    leftAxis: null,
  };
  const xAxisCommon = {
    data: timeData,
    scaleType: 'time',
    valueFormatter,
  };

  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({
        url: 'report/monthly-statistics',
      });
      setQuantity(response.map((e) => e.numberOfOrders));
      setRevenue(response.map((e) => e.totalRevenue));
    } catch (error) {
      toast.error('Thất bại');
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography fontWeight={'bold'}>
        Thống kê số hóa đơn và doanh thu
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <LineChart
          title='Thống kê số hóa đơn và doanh thu'
          xAxis={[
            {
              ...xAxisCommon,
              tickMinStep: 3600 * 1000 * 24 * 30, // min step: 30 days (approximate month)
            },
            {
              ...xAxisCommon,
              id: 'months',
              tickMinStep: 3600 * 1000 * 24 * 30, // min step: 12 hours
            },
          ]}
          {...config}
        />
      </Box>
    </>
  );
}
