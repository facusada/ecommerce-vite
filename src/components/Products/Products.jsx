import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="products-container">
        {currentProducts.map(product => (
          <div key={product.id} className="card" onClick={() => handleCardClick(product)}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>

      <Pagination 
        productsPerPage={productsPerPage} 
        totalProducts={products.length} 
        paginate={paginate} 
        currentPage={currentPage}
      />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Product Detail"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProduct && (
          <div className="product-detail">
            <button onClick={handleCloseModal} className="close-button">Close</button>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className="price">${selectedProduct.price}</p>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default Products;