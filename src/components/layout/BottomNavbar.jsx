import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiGrid, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import './BottomNavbar.css';

const BottomNavbar = () => {
    return (
        <nav className="bottom-navbar hide-desktop">
            <Link to="/" className="bottom-nav-link">
                <FiHome size={24} />
                <span>Home</span>
            </Link>
            <Link to="/categories" className="bottom-nav-link">
                <FiGrid size={24} />
                <span>Categories</span>
            </Link>
            <Link to="/search" className="bottom-nav-link">
                <FiSearch size={24} />
                <span>Search</span>
            </Link>
            <Link to="/cart" className="bottom-nav-link">
                <FiShoppingCart size={24} />
                <span>Cart</span>
            </Link>
            <Link to="/login" className="bottom-nav-link">
                <FiUser size={24} />
                <span>Profile</span>
            </Link>
        </nav>
    );
};

export default BottomNavbar;
