// React
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
// Material UI
import { Typography, Button, Card, CardActions, CardContent, CardMedia, Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
// Services
import { fetchAllProducts } from '../../services/Products.js';
// Components
import Pagination from '../Pagination/Pagination.jsx';
// Styles
import './Products.sass'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        let products = await fetchAllProducts();
        const categories = products
          .map(product => product.category)
          .filter((category, index, self) => self.indexOf(category) === index);
    
        setCategories(categories);
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getAllProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`/products/details/${product.id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const productsWithFilters = products.filter(product => selectedCategories.includes(product.category));
  const filteredProducts = selectedCategories.length === 0 ? currentProducts : products.filter(product => selectedCategories.includes(product.category));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleShowCategories = () => {
    if (categories.length > 0) {
      setShow(!show);
    }
  };

  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Box>
        <Button onClick={handleShowCategories} variant="contained" color="primary">Category Filters</Button>
        { show &&
          <FormGroup row>
            {categories.map(category => (
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes(category)} onChange={handleCategoryChange} name={category} />}
                label={category}
                key={category}
              />
            ))}
          </FormGroup>
        }
      </Box>

      <div className="products-container">
        {filteredProducts.map(product => (
          <Card key={product.id} onClick={() => handleCardClick(product)} sx={{ maxWidth: 345 }}>
            <CardContent>
              <CardMedia
                component="img"
                height='none'
                image={`/assets/${product.image}`}
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Pagination 
        productsPerPage={productsPerPage} 
        totalProducts={selectedCategories.length === 0 ? products.length : productsWithFilters} 
        paginate={paginate} 
        currentPage={currentPage}
      />
    </div>
  );
};

export default Products;