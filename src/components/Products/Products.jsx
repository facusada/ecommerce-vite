import React, { useEffect, useState, useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { Modal, Box, Typography, Button, IconButton, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';


import { fetchAllProducts } from '../../services/Products.js'
import Pagination from '../Pagination/Pagination.jsx';
import './Products.sass'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
      onChange(count - 1);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="products-container">
        {currentProducts.map(product => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          // <div key={product.id} className="card" onClick={() => handleCardClick(product)}>
          //   <img src={product.image} alt={product.title} />
          //   <h2>{product.title}</h2>
          //   <p className="price">${product.price}</p>
          // </div>
        ))}
      </div>

      <Pagination 
        productsPerPage={productsPerPage} 
        totalProducts={products.length} 
        paginate={paginate} 
        currentPage={currentPage}
      />

      { selectedProduct &&
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', height: 'auto' }} />
          <br />
          <Typography id="modal-title" variant="h6" component="h2">
            {selectedProduct.title}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedProduct.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Price: ${selectedProduct.price}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleDecrement} disabled={count <= 1}>
              <Remove />
            </IconButton>
            <Typography variant="h6" component="span" mx={2}>
              {count}
            </Typography>
            <IconButton onClick={handleIncrement}>
              <Add />
            </IconButton>
          </Box>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal> }

      {/* {selectedProduct &&
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className='dialog-selected-product'
      >
        <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="500"
          src={selectedProduct.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </Dialog>} */}

      {/* <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Product Detail"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProduct && (
          <div className="product-detail">
            <button onClick={handleCloseModal} className="close-button">X</button>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className="price">${selectedProduct.price}</p>
          </div>
        )}
      </ReactModal> */}
    </div>
  );
};

export default Products;