// React
import React, { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
// Services
import { fetchProductById } from '../../../services/Products.js';
// Material UI
import { Box, Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove, ArrowBack } from '@mui/icons-material'
// Styles
import './ProductDetails.sass'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        data.stock = 4
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    getProductDetails();
  }, []);
  
  
  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Card>
          <CardMedia
            className='card-media'
            component="img"
            height="inehrit"
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
              ${product.price}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton disabled={quantity <= 1} onClick={handleRemove}>
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ margin: '0 10px' }}>
                {quantity}
              </Typography>
              <IconButton disabled={quantity >= product.stock} onClick={handleAdd}>
                <Add />
              </IconButton>
            </Box>
            <Box className='actions'>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add to Cart
              </Button>
              <Button
                startIcon={<ArrowBack />}
                onClick={goBack}
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2, marginLeft: '10px' }}
              >
                Go Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default ProductDetails