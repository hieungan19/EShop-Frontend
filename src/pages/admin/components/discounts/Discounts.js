import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';
import SearchAddButton from '../../../../components/search/SearchAddButton';
import { fetchDataAxios } from '../../../../api/customAxios';
import { useDispatch } from 'react-redux';
import { STORE_COUPONS } from '../../../../redux/slice/couponSlice';
import TableStyleHeader from '../../../../components/style-component/StyleTableHeader';
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'HH:mm dd/MM/yyyy');
};

const applyCouponTypeToString = (applyCouponType) => {
  return applyCouponType === 0 ? 'Order' : 'Product';
};

const renderTableCell = (value) => {
  return value !== null ? value : 'N/A';
};

const fetchData = async () => {
  console.log('Fetch data');
  try {
    const response = await fetchDataAxios({ url: 'coupons' });
    return response;
  } catch (error) {
    console.error('Error fetching coupons:', error);
  }
};

const Discounts = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [coupons, setCoupons] = useState([]);
  const dispatch = useDispatch();

  const fetchDataAndDispatch = async () => {
    const response = await fetchData();
    if (response) {
      setCoupons(response.coupons);
      dispatch(STORE_COUPONS({ coupons: response.coupons }));
    }
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Reset to the first page when searching
  };

  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      <SearchAddButton
        searchTerm={searchTerm}
        onClickAddBtn={handleOpenDialog}
        handleSearchChange={handleSearch}
      />

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableStyleHeader>ID</TableStyleHeader>
              <TableStyleHeader>Name</TableStyleHeader>
              <TableStyleHeader>Apply Coupon Type</TableStyleHeader>
              <TableStyleHeader>Discount Percent</TableStyleHeader>
              <TableStyleHeader>Discount Amount</TableStyleHeader>
              <TableStyleHeader>Start Date</TableStyleHeader>
              <TableStyleHeader>End Date</TableStyleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.id}</TableCell>
                <TableCell>{coupon.name}</TableCell>
                <TableCell>
                  {applyCouponTypeToString(coupon.applyCouponType)}
                </TableCell>
                <TableCell>
                  {renderTableCell(`${coupon.discountPercent}%`)}
                </TableCell>
                <TableCell>{renderTableCell(coupon.discountAmount)}</TableCell>
                <TableCell>{formatDate(coupon.startDate)}</TableCell>
                <TableCell>{formatDate(coupon.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Discounts;
