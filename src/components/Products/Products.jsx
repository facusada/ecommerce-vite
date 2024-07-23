import React, { useEffect, useState } from 'react';
import './Products.sass'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
        </div>
      ))}
    </div>
  )
};

export default Products;