// React
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Material UI
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ProductNotFoundModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const goBack = () => {
    onClose();
    navigate(-1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="product-not-found-title"
      aria-describedby="product-not-found-description"
    >
      <DialogTitle id="product-not-found-title">Product Not Found</DialogTitle>
      <DialogContent>
        <DialogContentText id="product-not-found-description">
          The product you are looking for does not exist or has been removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goBack} color="primary">
          Go Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductNotFoundModal;