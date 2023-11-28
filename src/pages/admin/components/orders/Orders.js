import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAxios } from '../../../../api/customAxios';
import TableStyleHeader from '../../../../components/style-component/StyleTableHeader';
import { selectUserToken } from '../../../../redux/slice/authSlice';
import { STORE_CUSTOMERS } from '../../../../redux/slice/customerSlice';
import { Colors } from '../../../../styles/theme';
import { STORE_ORDERS } from '../../../../redux/slice/orderSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Pagination from '../../../../components/pagination/Pagination';
import { OrderStatus } from '../../../../utils/Constant';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector(selectUserToken);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  const fetchOrders = async () => {
    console.log('Fetch orders');
    try {
      const response = await fetchDataAxios({ url: 'orders', token: token });
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDataAndDispatch = async () => {
    const response = await fetchOrders();

    if (response) {
      setOrders(response);
      dispatch(STORE_ORDERS({ orders: response }));
    }
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const filteredOrders = orders
    ? orders.filter((o) =>
        o.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = Math.ceil(filteredOrders.length / itemsPerPage);
  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      <div
        style={{ display: 'flex', alignItems: 'stretch', marginBottom: '10px' }}
      >
        <TextField
          label='Search Order by User name'
          variant='outlined'
          fullWidth
          margin='normal'
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ m: 0, p: 0 }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableStyleHeader>ID</TableStyleHeader>
              <TableStyleHeader>Customer Name</TableStyleHeader>
              <TableStyleHeader>Total</TableStyleHeader>
              <TableStyleHeader>Is Payed</TableStyleHeader>
              <TableStyleHeader>Status</TableStyleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPayed === true ? (
                    <CheckCircleIcon color='success' />
                  ) : (
                    <CancelIcon color='error' />
                  )}
                </TableCell>
                <TableCell>{OrderStatus[order.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers}
          onPageChange={setCurrentPage}
        />
      </TableContainer>
    </div>
  );
};

export default Orders;
