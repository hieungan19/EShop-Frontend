import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { format } from 'date-fns';
import SearchAddButton from '../../../../components/search/SearchAddButton';
import { fetchDataAxios } from '../../../../api/customAxios';
import { useDispatch } from 'react-redux';
import { STORE_COUPONS } from '../../../../redux/slice/couponSlice';
import TableStyleHeader from '../../../../components/style-component/StyleTableHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
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

const fetchData = async () => {
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
  const [filterType, setFilterType] = useState(''); // Apply Coupon Type filter
  const [filterDate, setFilterDate] = useState(null); // Date filter
  const [filterAmount, setFilterAmount] = useState('');
  const [filterStartDate, setFilterStartDate] = useState();
  const [filterEndDate, setFilterEndDate] = useState();

  //form
  const handleOpenCouponForm = () => {
    setOpen(true);
  };
  const handleCloseCouponForm = () => {
    setOpen(false);
  };

  // Discount Amount or Percentage filter
  const [showFilterForm, setShowFilterForm] = useState(false);

  const toggleFilterForm = () => {
    setShowFilterForm(!showFilterForm);
  };
  // handle filter
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterDateChange = (date) => {
    setFilterDate(date);
  };

  const handleFilterAmountChange = (e) => {
    setFilterAmount(e.target.value);
  };

  const clearFilters = () => {
    setFilterType('');
    setFilterDate(null);
    setFilterAmount('');
  };

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

  //filter
  const filteredCoupons = coupons.filter((coupon) => {
    // Apply Coupon Type filter
    const isTypeMatch =
      filterType === '' || coupon.applyCouponType.toString() === filterType;

    // Date filter
    const isDateMatch = !filterDate || new Date(coupon.startDate) <= filterDate;

    // Discount Amount or Percentage filter
    const isAmountMatch =
      filterAmount === '' ||
      coupon.discountAmount.toString().includes(filterAmount) ||
      coupon.discountPercent.toString().includes(filterAmount);

    return isTypeMatch && isDateMatch && isAmountMatch;
  });

  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      <SearchAddButton
        searchTerm={searchTerm}
        onClickAddBtn={handleOpenDialog}
        handleSearchChange={handleSearch}
      />
      <Button variant='outlined' onClick={toggleFilterForm}>
        Show Filters
      </Button>

      <Dialog
        open={showFilterForm}
        onClose={toggleFilterForm}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Filter Coupons</DialogTitle>
        <DialogContent>
          <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel id='filter-type-label'>Apply Coupon Type</InputLabel>
            <Select
              labelId='filter-type-label'
              id='filter-type'
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='0'>Order</MenuItem>
              <MenuItem value='1'>Product</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <DateTimePicker
                  label='With Time Clock'
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
                <DateTimePicker
                  label='Without view renderers'
                  viewRenderers={{
                    hours: null,
                    minutes: null,
                    seconds: null,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={clearFilters}>
            Clear Filters
          </Button>
        </DialogActions>
      </Dialog>

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
      <CouponForm open={open} onClose={handleCloseCouponForm} />
    </div>
  );
};

export default Coupons;
