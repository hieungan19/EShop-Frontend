import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../styles/theme';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchDataAxios } from '../../api/customAxios';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import OrderList from './OrderList';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OrderHistoryPage = () => {
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState({});

  const userId = useSelector(selectUserId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrdersByUserId = async () => {
    try {
      const response = await fetchDataAxios({ url: `orders/user/${userId}` });
      const pendingOrders = [];
      const shippingOrders = [];
      const finishedOrders = [];
      const canceledOrders = [];
      console.log(response);
      response.forEach((o) => {
        switch (o.status) {
          case 0:
            pendingOrders.push(o);
            break;
          case 1:
            shippingOrders.push(o);

            break;
          case 2:
            finishedOrders.push(o);
            break;
          case 3:
            canceledOrders.push(o);
            break;
          default:
        }
      });

      console.log(pendingOrders[0]);

      setOrders({
        pendingOrders,
        shippingOrders,
        canceledOrders,
        finishedOrders,
      });
    } catch (error) {
      toast.error('Failed.');
    }
  };

  useEffect(() => {
    fetchOrdersByUserId();
  }, []);

  return (
    <Box>
      <Container
        sx={{
          backgroundColor: Colors.white,
          mb: 4,
          mt: 2,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' fontWeight={'bold'}>
          ĐƠN MUA{' '}
        </Typography>
      </Container>
      <Container>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            flexGrow: 1,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            variant='fullWidth'
          >
            <Tab label='Chờ xác nhận' {...a11yProps(0)} />
            <Tab label='Đang vận chuyển' {...a11yProps(1)} />
            <Tab label='Đã giao' {...a11yProps(2)} />
            <Tab label='Hủy' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <OrderList orders={orders.pendingOrders ?? []} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OrderList orders={orders.shippingOrders ?? []} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <OrderList orders={orders.finishedOrders ?? []} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <OrderList orders={orders.canceledOrders ?? []} />
        </CustomTabPanel>
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;
