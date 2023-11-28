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

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector(selectUserToken);
  const [customers, setCustomers] = useState([]);

  const dispatch = useDispatch();

  const fetchCustomers = async () => {
    console.log('Fetch users');
    try {
      const response = await fetchDataAxios({ url: 'users', token: token });
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDataAndDispatch = async () => {
    const response = await fetchCustomers();

    if (response) {
      setCustomers(response.users);
      dispatch(STORE_CUSTOMERS({ customers: response.users }));
    }
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const filteredCustomers = customers
    ? customers.filter((c) =>
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      <div
        style={{ display: 'flex', alignItems: 'stretch', marginBottom: '10px' }}
      >
        <TextField
          label='Search Customers'
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
              <TableStyleHeader>Email</TableStyleHeader>
              <TableStyleHeader>Default Address</TableStyleHeader>
              <TableStyleHeader>Default Phone Number</TableStyleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address ?? 'N/A'}</TableCell>
                <TableCell>{customer.phoneNumber ?? 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
