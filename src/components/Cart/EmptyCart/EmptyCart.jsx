// React
import React from 'react';
// Material UI
import { Box, Typography } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
// Styles
import './EmptyCart.sass';

const EmptyCart = () => (
  <Box className="empty-cart-container">
    <ShoppingCartOutlined style={{ fontSize: 100 }}  className="empty-cart-icon" />
    <Typography variant='h4' className="empty-cart-message">
      Your cart is empty
    </Typography>
  </Box>
);

export default EmptyCart;