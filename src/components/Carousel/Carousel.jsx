// React
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
// Services
import { fetchAllProducts } from '../../services/Products.js'
// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.sass'

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        const uploadImages = products.map(product => `/assets/${product.image}`)
        setImages(uploadImages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  if (loading) return <div className="loader-container"><ClipLoader color="#007bff" size={50} /></div>;

  return (
    <div className="carousel-container">
      <Slider { ...settings }>
        { images.map((image, index) => (
          <div key={index}>
            <img src={image} />
          </div>
        )) }
      </Slider>
    </div>
  );
};

export default Carousel;