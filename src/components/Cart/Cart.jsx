// React
import React, { useState } from 'react';
//Context
import { useCart } from '../../context/CartContext';
// Material UI
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Styles
import './Cart.sass';

const Cart = () => {
  const { cart, emptyCart, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const handleOpen = (id) => {
    setItemIdToDelete(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleConfirmDeleteItem = () => {
    removeItem(itemIdToDelete);
    handleClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        cart.map((item) => (
          <Box key={item.id} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{item.title} - Quantity: {item.quantity}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleOpen(item.id)}><DeleteIcon></DeleteIcon></Button>
          </Box>
        ))
      )}
      <Button variant="contained" color="primary">Checkout</Button>
      <Button variant="contained" color="secondary" onClick={() => emptyCart()}>Empty Cart</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteItem} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;