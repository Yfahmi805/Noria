import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiMapPin, 
  FiMail, 
  FiPhone 
} from 'react-icons/fi';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-column">
            <h3 className="footer-title">Noria</h3>
            <p className="footer-desc">
              A multi-vendor marketplace connecting Moroccan agricultural cooperatives 
              with customers seeking natural products, supporting the social and 
              solidarity economy.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="social-link">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="social-link">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/vendors">Vendor Directory</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories Column */}
          <div className="footer-column">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/categories/food">Natural Foods</Link></li>
              <li><Link to="/categories/cosmetics">Natural Cosmetics</Link></li>
              <li><Link to="/categories/oils">Argan & Essential Oils</Link></li>
              <li><Link to="/categories/spices">Spices & Herbs</Link></li>
              <li><Link to="/categories/honey">Honey & Bee Products</Link></li>
              <li><Link to="/categories/handicrafts">Traditional Crafts</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <FiMapPin className="contact-icon" />
                <p>rue Ahmed ben rahal belevedere, Casablanca, Morocco</p>
              </li>
              <li>
                <FiMail className="contact-icon" />
                <p>contact@Noria.com</p>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <p>+212 5XX-XXXXXX</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Noria. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;