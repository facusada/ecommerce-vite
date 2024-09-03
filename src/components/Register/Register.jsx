// React
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
// Material UI
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
// Services
import { createUser } from '../../services/Auth.js';
// Styles
import './Register.sass';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
     ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await createUser(formData);

      if (response.success === false) {
        handleClick(response.message, 'error');
        return;
      };

      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      handleClick('Registration successful! You can now log in.', 'success');
      return;
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
    <Box className="register-container" sx={{ padding: 3 }}>
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
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form className="form-register" onSubmit={handleSubmit}>
        <Box className="container-name" sx={{ marginBottom: 2 }}>
          <Box className="box-name" sx={{ marginBottom: 2 }}>
            <TextField
              label="Name"
              name="name"
              className="name-input"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Surname"
              name="surname"
              type="surname"
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box className="container-email" sx={{ marginBottom: 2 }}>
          <Box className="box-email" sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              className='email-input'
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box className="container-password" sx={{ marginBottom: 2 }}>
          <Box className="box-password" sx={{ marginBottom: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              className="password-input"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Box>
  )
}

export default Register