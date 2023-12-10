import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, data }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Confirm Delete ${data.name}`}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {data.name}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDeleteDialog;
