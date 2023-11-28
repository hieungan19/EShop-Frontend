import { Box } from '@mui/material';
import React from 'react';

const AdminLayout = ({ children }) => {
  return <Box sx={{ pl: { xs: 0, sm: '200px' } }}>{children}</Box>;
};

export default AdminLayout;
