import React, { useState, useEffect } from 'react';
import Hero3 from '../../assets/images/Hero3.png';
import Hero4 from '../../assets/images/Hero4.png';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Hero3, Hero4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <Link to="/products" >
      <img
        src={images[currentImage]}
        alt="Moroccan natural products"
        className="hero-img"
      />
      </Link>
    </section>
  );
};

export default Hero;