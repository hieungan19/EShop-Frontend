import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDataAxios } from '../../../../api/customAxios';
import SearchAddButton from '../../../../components/search/SearchAddButton';
import TableStyleHeader from '../../../../components/style-component/StyleTableHeader';
import { STORE_COUPONS } from '../../../../redux/slice/couponSlice';
import CouponForm from './CouponFormModal';
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

export const fetchALlCoupons = async () => {
  console.log('Fetch data');
  try {
    const response = await fetchDataAxios({ url: 'coupons' });
    return response;
  } catch (error) {
    console.error('Error fetching coupons:', error);
  }
};

const Coupons = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [coupons, setCoupons] = useState([]);
  const dispatch = useDispatch();

  //form
  const handleOpenCouponForm = () => {
    setOpen(true);
  };
  const handleCloseCouponForm = () => {
    setOpen(false);
  };

  const fetchDataAndDispatch = async () => {
    const response = await fetchALlCoupons();
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
  };

  const filteredCoupons = coupons
    ? coupons.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
              <TableStyleHeader>Tên</TableStyleHeader>
              <TableStyleHeader>Loại giảm giá</TableStyleHeader>
              <TableStyleHeader>Phần trăm giảm</TableStyleHeader>
              <TableStyleHeader>Số tiền giảm</TableStyleHeader>
              <TableStyleHeader>Bắt đầu</TableStyleHeader>
              <TableStyleHeader>Kết thúc</TableStyleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <Tooltip key={coupon.id} title={coupon.desciption} arrow>
                <TableRow>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell>{coupon.name}</TableCell>
                  <TableCell>
                    {applyCouponTypeToString(coupon.applyCouponType)}
                  </TableCell>
                  <TableCell>
                    {renderTableCell(coupon.discountPercent)}%
                  </TableCell>
                  <TableCell>
                    {renderTableCell(coupon.discountAmount)}
                  </TableCell>
                  <TableCell>{formatDate(coupon.startDate)}</TableCell>
                  <TableCell>{formatDate(coupon.endDate)}</TableCell>
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CouponForm
        open={open}
        onClose={handleCloseCouponForm}
        setCoupons={setCoupons}
      />
    </div>
  );
};

export default Coupons;
