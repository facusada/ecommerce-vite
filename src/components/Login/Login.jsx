// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
// Material UI
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
// Services
import { loginUser } from '../../services/Auth.js';
// Context
import { useAuth } from '../../context/AuthContext';
// Styles
import './Login.sass'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const dataLoginUser = await loginUser(email, password);

      if (!dataLoginUser.success) {
        handleClick('User not found', 'error')
        return;
      }

      login(dataLoginUser.user);
      handleClick('Login successfully', 'success');
    } catch (err) {
      handleClick('An error occurred. Please try again.', 'error');
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
  };

  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          { message }
        </Alert>
      </Snackbar>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <Box className="container-fields">
          <TextField
            className='field-email'
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            className='field-password'
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
        </Box>
        <Button disabled={user.isAuthenticated} type="submit" variant="contained" color="primary" sx={{ marginTop: 2 , marginRight: "10px"}}>
          Login
        </Button>

        <Button
          className="register-btn"
          color="secondary"
          variant="contained"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Login;