// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
// Context
import { useCart } from '../../context/CartContext';
// Material UI
import { Box, Typography, TextField, Button, Card, CardContent, Snackbar, Alert } from '@mui/material';
// Services
import { updateProductStock } from '../../services/Products';
import { orderManager } from '../../services/Orders';
// Styles
import './Checkout.sass';

const Checkout = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const { cart, emptyCart } = useCart();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  };

  const handleCheckout = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await orderManager(cart, name, email)

      for (const item of cart) {
        const newStock = item.stock - item.quantity;
        await updateProductStock(item.id, newStock);
      }

      handleClick('Order placed successfully! Thank you for your purchase.', 'success');
      emptyCart();
    } catch (err) {
      setError(err.message);
      handleClick('An error occurred while placing your order. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    navigate('/products')
  };

  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;

  return (
    <Box className="checkout-container" sx={{ padding: 2 }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant='h2' className="checkout-header">Checkout</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty. Add items to your cart before checking out.</Typography>
      ) : (
        <>
        <form onSubmit={handleCheckout}>
          <Box className="checkout-form">
            <TextField
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type='email'
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          <Box className="checkout-summary">
            <Typography variant="h6">Order Summary:</Typography>
            {cart.map((item) => (
              <Card key={item.id} className="checkout-item">
                <CardContent>
                  <Typography variant="h6">{item.title} - Quantity: {item.quantity}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box className="checkout-actions">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => goBack()}
              >
              Go back
            </Button>
            <Button
              type="submit"
              className="checkout-button"
              variant="contained"
              color="primary"
              >
              Confirm Order
            </Button>
          </Box>
        </form>
        </>
      )}
    </Box>
  );
};

export default Checkout;