import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Avatar,
  Grid,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Colors } from '../../styles/theme';
import axios from 'axios';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const UserProfile = () => {
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
  const handleUpdateProfile = () => {};

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
    <Container maxWidth='sm' style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box
        sx={{
          position: 'relative',
          bottom: 0, // Adjust this value to create space for the upload button
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={avatar}
          alt='Avatar'
          sx={{
            width: 120,
            height: 120,
            border: '4px solid #fff',
            marginBottom: 2,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the box
            padding: 2,
            zIndex: 2,
          }}
        >
          {/* Thêm biểu tượng hoặc nút thay đổi ảnh bìa tại đây */}
          <Tooltip title='Change Avatar'>
            <IconButton
              style={{
                backgroundColor: '#fff',
                opacity: 0.5, // Màu nền trắng
              }}
            >
              <DriveFolderUploadIcon />
              <input
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 1000,
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Typography variant='h6' color='textSecondary' fontWeigh={600}>
        User name
      </Typography>
      <form>
        <TextField
          label='Full name'
          fullWidth
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Typography
          variant='subtitle1'
          color={Colors.secondary}
          textAlign={'left'}
          sx={{ mt: 2 }}
        >
          *Set default address and phone number
        </Typography>
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

        <Button
          variant='contained'
          color='primary'
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
