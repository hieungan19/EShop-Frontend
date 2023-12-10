import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUserRole } from '../../redux/slice/authSlice';

const AdminOnlyRoute = ({ children }) => {
  const roleName = useSelector(selectUserRole);
  if (roleName === 'Admin') {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
