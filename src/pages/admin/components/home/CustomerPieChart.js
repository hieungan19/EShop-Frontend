import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import { fetchDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';

export default function CustomerPieChart() {
  const [data, setData] = React.useState([
    { label: '=0', value: 400, color: '#0088FE' },
    { label: '<1 triệu', value: 300, color: '#00C49F' },
    { label: '1-5 triệu', value: 300, color: '#FFBB28' },
    { label: '5-10 triệu', value: 200, color: '#FF8042' },
    { label: '>10 triệu', value: 200, color: '#FF8042' },
  ]);

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({ url: 'report/customer' });
      const values = Object.values(response);
      setData(
        data.map((e, index) => ({
          label: e.label,
          value: values[index],
          color: e.color,
        }))
      );
    } catch (error) {
      toast.error('Thất bại');
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Typography fontWeight={'bold'}>Thống kê phân khúc khách hàng</Typography>
      <PieChart
        title='Thống kê phân khúc khách hàng'
        series={[
          {
            outerRadius: 80,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </>
  );
}
