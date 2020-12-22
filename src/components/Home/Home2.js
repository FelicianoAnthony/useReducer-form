import React from 'react';
import './Home2.css'
import Home3 from './Home3';

const Home2 = (props) => {

  return (
    <>
      <h1 className='home2-header'> This component (Home2) is nested in Home </h1>
      <Home3/>
  </>
  ) 
}

export default Home2;