import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddressForm from '../../components/order/AddressForm';
import { storage } from '../../firebase/config';
import {
  SET_ACTIVE_USER,
  SET_USER_DEFAULT_ADDRESS,
  selectAvatarUrl,
  selectDefaultAddress,
  selectDefaultPhoneNumber,
  selectFullName,
  selectUserId,
  selectUserInfo,
  selectUserToken,
} from '../../redux/slice/authSlice';
import { Colors } from '../../styles/theme';
import { putDataAxios } from '../../api/customAxios';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(useSelector(selectAvatarUrl) ?? '');
  const [userFullname, setUserFullname] = useState(
    useSelector(selectFullName) ?? ''
  );
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    useSelector(selectDefaultPhoneNumber) ?? ''
  );
  const [userAddress, setUserAddress] = useState(
    useSelector(selectDefaultAddress) ?? []
  );
  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserId);
  const [imageUrl, setImageUrl] = useState(useSelector(selectAvatarUrl) ?? '');
  const user = useSelector(selectUserInfo);

  const [imageFile, setImageFile] = useState();

  useEffect(() => {}, []);

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `avatar/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          toast.error(error.message);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);
            setImageUrl(downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            reject(error);
          }
        }
      );
    });
  };
  const updateImageUrl = async () => {
    if (imageFile) await handleImageUpload(imageFile);
  };
  const handleUpdateProfile = async () => {
    const stringDefaultAddress = userAddress.join(', ');

    try {
      // Tải ảnh lên Firebase Storage
      await updateImageUrl();
      const data = {
        fullName: userFullname,
        phoneNumber: userPhoneNumber,
        address: stringDefaultAddress,
        avatarUrl: imageUrl,
      };

      const response = await putDataAxios({
        url: `users/${userId}`,
        data,
        token: token,
      });
      dispatch(SET_USER_DEFAULT_ADDRESS({ address: userAddress }));
      dispatch(
        SET_ACTIVE_USER({ ...user, ...data, address: userAddress, avatar })
      );
      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại');
      console.log(error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
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
        {userFullname}
      </Typography>
      <form>
        <TextField
          label='Full name'
          fullWidth
          margin='normal'
          value={userFullname}
          onChange={(e) => setUserFullname(e.target.value)}
        />
        <Typography
          variant='subtitle1'
          color={Colors.secondary}
          textAlign={'left'}
          sx={{ mt: 2 }}
        >
          *Set default address and phone number
        </Typography>
        <Typography>{userAddress.join(', ')}</Typography>
        <TextField
          label='Phone Number'
          fullWidth
          margin='normal'
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value.replace(/\D/, ''))}
          inputProps={{ maxLength: 10 }}
        />
        <AddressForm
          userAddress={userAddress}
          setUserAddress={setUserAddress}
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
