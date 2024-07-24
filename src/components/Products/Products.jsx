import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './Products.sass'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    allProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="card" onClick={() => handleCardClick(product)}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>
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