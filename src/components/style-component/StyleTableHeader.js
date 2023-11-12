import { TableCell, Typography } from '@mui/material';
import React from 'react';

const StyleTableHeader = ({ children }) => (
  <TableCell>
    <Typography variant='body1' fontWeight='bold'>
      {children}
    </Typography>
  </TableCell>
);

export default StyleTableHeader;
