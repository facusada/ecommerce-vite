import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ProductNotFound = ({ onRetry }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        p: 3
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 100,
          color: '#f44336',
          mb: 2
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Product Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The product you are looking for does not exist or is no longer available.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={goBack}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default ProductNotFound;