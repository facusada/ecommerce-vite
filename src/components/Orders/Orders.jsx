// MyOrder.jsx

// React
import React, { useEffect, useState } from 'react';
// Firebase
import { getUserOrders } from '../../services/Orders';
// Material UI
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
// Context
import { useAuth } from '../../context/AuthContext';
// Styles
import './Orders.sass'

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getUserOrders(user.email);
        setOrders(userOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box className="orders-container">
      <Typography variant="h4" gutterBottom>My Orders</Typography>
       {orders.length > 0 ? (
          orders.map((order) => (
             <Paper className="order-item" key={order.id}>
                <div className="order-details">
                   <Typography variant="h6">Order ID: {order.id}</Typography>
                   <Typography className="order-total">Total: ${order.total}</Typography>
                   <List className="order-items-list">
                      {order.items.map((item, index) => (
                          <ListItem key={index} className="order-item-detail">
                            <ListItemText primary={`${item.title}`} secondary={`Quantity: ${item.quantity}`} />
                          </ListItem>
                      ))}
                    </List>
                </div>
             </Paper>
          ))
       ) : (
          <Typography className="no-orders-message">No orders found</Typography>
       )}
    </Box>
 );
};

export default MyOrder;