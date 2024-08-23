// React
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
// Services
import { fetchProductById } from '../../../services/Products.js';
// Material UI
import { Box, Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove, ArrowBack } from '@mui/icons-material'
// Styles
import './ProductDetails.sass'
// Context
import { useCart } from '../../../context/CartContext';

const ProductDetails = () => {
  const productId = useParams().productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
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

  const handleAddToCart = () => {
    if (product) {
      quantity > 1 ? setQuantity(1) : quantity
      addToCart(product, quantity);
    }
  };
  
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        let productSelected = await fetchProductById(productId);

        setProduct(productSelected);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
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
        <Card className='container-card'>
          <CardMedia
            className='card-media'
            component="img"
            height="inehrit"
            image={`/assets/${product.image}`}
            alt={product.title}
          />
          <CardContent className='card-body'>
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
            <Box className='card-actions'>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleAddToCart}
              >
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