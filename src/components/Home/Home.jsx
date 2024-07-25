import React from 'react';
import ItemListContainer from './ItemListContainer';
import Carousel from '../Carousel/Carousel';

const Home = () => (
  <div>
    {/* <h1>Home</h1> */}
    <ItemListContainer greeting="Welcome to our store!" />
    <Carousel />
  </div>
);

export default Home;