import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  STORE_CART_DISCOUNT,
  STORE_ORDER_ADDRESS,
  selectAddress,
} from '../../redux/slice/cartSlice';

const AddressForm = ({ userAddress, setUserAddress }) => {
  const dispatch = useDispatch();
  console.log(userAddress);
  const [selectedProvince, setSelectedProvince] = useState(
    userAddress[3] ?? ''
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    userAddress[2] ?? ''
  );
  const [selectedWard, setSelectedWard] = useState(userAddress[1] ?? '');

  const [houseNumberStreet, setHouseNumberStreet] = useState(
    userAddress[0] ?? ''
  );

  const addressApiUrl = 'https://provinces.open-api.vn/api';
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [address, setAddress] = useState({
    allProvinces: [],
    allDistricts: [],
    allWards: [],
  });

  const filterDistricts = ({ provinceId }) => {
    const newDistricts = address.allDistricts.filter(
      (d) => d.province_code === provinceId
    );
    setDistricts(newDistricts);
  };
  const filterWards = ({ districtId }) => {
    const newWards = address.allWards.filter(
      (w) => w.district_code === districtId
    );
    setWards(newWards);
  };
  const fetchAllAddress = async () => {
    const resProvince = await axios.get(`${addressApiUrl}/p`);
    const resDistrict = await axios.get(`${addressApiUrl}/d`);
    const resWard = await axios.get(`${addressApiUrl}/w`);
    setAddress({
      allProvinces: resProvince.data,
      allDistricts: resDistrict.data,
      allWards: resWard.data,
    });
  };
  useEffect(() => {
    try {
      fetchAllAddress();
    } catch (err) {
      console.log('Fetch failed');
    }
  }, []);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    const newAddress = e.target.value;

    setUserAddress((prevAddresses) => {
      // Tạo một bản sao mới của mảng userAddress và cập nhật phần tử thứ 4
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[3] = newAddress.name;
      return updatedAddresses;
    });

    filterDistricts({ provinceId: e.target.value.code });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    console.log(e.target.value);
    const newAddress = e.target.value;

    setUserAddress((prevAddresses) => {
      // Tạo một bản sao mới của mảng userAddress và cập nhật phần tử thứ 4
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[2] = newAddress.name;
      return updatedAddresses;
    });

    filterWards({ districtId: e.target.value.code });
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    const newAddress = e.target.value;

    setUserAddress((prevAddresses) => {
      // Tạo một bản sao mới của mảng userAddress và cập nhật phần tử thứ 4
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[1] = newAddress.name;
      return updatedAddresses;
    });
  };
  const handleAddressDetailChange = (e) => {
    setHouseNumberStreet(e.target.value);
    const newAddress = e.target.value;

    setUserAddress((prevAddresses) => {
      // Tạo một bản sao mới của mảng userAddress và cập nhật phần tử thứ 4
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[0] = newAddress;
      return updatedAddresses;
    });
  };

  return (
    <Box style={{ textAlign: 'center' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='province-label'>Province</InputLabel>
              <Select
                labelId='province-label'
                id='province'
                label='Province'
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                {address.allProvinces.map((province, index) => (
                  <MenuItem key={index} value={province}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='district-label'>District</InputLabel>
              <Select
                labelId='district-label'
                id='district'
                label='district'
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                {districts.map((district, index) => (
                  <MenuItem key={index} value={district}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id='ward-label'>Ward</InputLabel>
              <Select
                labelId='ward-label'
                id='ward'
                label='ward'
                value={selectedWard}
                onChange={handleWardChange}
              >
                {wards.map((ward, index) => (
                  <MenuItem key={index} value={ward.name}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='House Number & Street'
              fullWidth
              margin='normal'
              value={houseNumberStreet}
              onChange={handleAddressDetailChange}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
