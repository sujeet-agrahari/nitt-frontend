import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function FormDialog({
  dialogContent,
  children,
  handleConfirm,
  handleClose,
  isOpen,
  title,
  confirmTitle = 'Update',
}) {
  return (
    <Box>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>{confirmTitle}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
