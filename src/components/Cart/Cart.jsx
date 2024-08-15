// React
import React, { useState } from 'react';
// Components
import EmptyCart from './EmptyCart/EmptyCart';
//Context
import { useCart } from '../../context/CartContext';
// Material UI
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Styles
import './Cart.sass';

const Cart = () => {
  const { cart, emptyCart, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const [openEmptyCartConfirmation, setOpenEmptyCartConfirmation] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  
  const handleClose = () => setOpen(false);
  const handleCloseEmptyCart = () => setOpenEmptyCartConfirmation(false);
  
  const handleOpen = (id) => {
    setItemIdToDelete(id);
    setOpen(true);
  };

  const emptyCartConfirmation = () => {
    emptyCart();
    setOpenEmptyCartConfirmation(false);
  };

  const handleConfirmDeleteItem = () => {
    removeItem(itemIdToDelete);
    handleClose();
  };

  return (
    <Box className="cart-container" sx={{ padding: 2 }}>
      <Typography variant='h2' className="cart-header">Shopping Cart</Typography>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          cart.map((item) => (
            <Box key={item.id} className="cart-item">
              <Box className="cart-item-description">
                <CardContent className="container-image">
                  <CardMedia sx={{ height: 100}} component="img" key={item.id} image={`/assets/${item.image}`} />
                </CardContent>
                <Box className="text">
                  <Typography className="cart-item-title">
                    {item.title}
                  </Typography>
                  <Typography className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
              </Box>
              <Button
                className="cart-item-button"
                variant="contained"
                color="error"
                onClick={() => handleOpen(item.id)}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))
        )}
        <Box className="cart-actions">
          <Button
            className="checkout-button"
            variant="contained"
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
          <Button
            className="empty-cart-button"
            variant="contained"
            color="error"
            onClick={() => setOpenEmptyCartConfirmation(true)}
            disabled={cart.length === 0}
          >
            Empty Cart
          </Button>
        </Box>

      {/* Dialog to confirm product deletion */}  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteItem} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to confirm empty cart */}
      <Dialog open={openEmptyCartConfirmation} onClose={handleCloseEmptyCart}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmptyCart} color="primary">
            Cancel
          </Button>
          <Button onClick={emptyCartConfirmation} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;