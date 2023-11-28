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

const AddressForm = () => {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [houseNumberStreet, setHouseNumberStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
    filterDistricts({ provinceId: e.target.value.code });
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    console.log(e.target.value);
    filterWards({ districtId: e.target.value.code });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box width={'350px'} style={{ textAlign: 'center' }}>
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
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                {wards.map((ward, index) => (
                  <MenuItem key={index} value={ward}>
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
              onChange={(e) => setHouseNumberStreet(e.target.value)}
            />
          </Grid>
        </Grid>

        <TextField
          label='Phone Number'
          fullWidth
          margin='normal'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))}
          inputProps={{ maxLength: 10 }}
        />
      </form>
    </Box>
  );
};

export default AddressForm;
