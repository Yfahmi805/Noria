import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import logoImg from '../../assets/images/logo1.png'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          
              {/* Mobile menu toggle */}
            <button className="navbar-toggle hide-desktop" onClick={toggleMenu}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <img src={logoImg} alt="Noria" />
            </Link>
         



          {/* Navigation links */}
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/vendors" className="nav-link">Vendors</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>

          {/* Search, cart, and user menu */}
          <div className="navbar-actions">
            <Link to="/search" className="navbar-icon">
              <FiSearch size={20} />
            </Link>
            <Link to="/cart" className="navbar-icon">
              <FiShoppingCart size={20} />
              <span className="cart-count">{cartItems.length}</span>
            </Link>

            <Link to="/login" className="navbar-icon">
              <FiUser size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
