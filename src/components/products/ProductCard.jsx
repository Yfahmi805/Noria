import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import vendors from '../../assets/data/vendors';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const {
    id,
    name,
    price,
    image,
    vendorId,
    category,
    discountPrice,
    rating
  } = product;

  const vendor = vendors.find(v => v.id === vendorId);

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className="product-img" />
        </Link>
        <div className="product-actions">
          <button className="product-action-btn" onClick={handleAddToCart}>
            <FiShoppingCart size={18} />
          </button>
          <button className="product-action-btn">
            <FiHeart size={18} />
          </button>
        </div>
        {category && <span className="product-category">{category}</span>}
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>

        <div className="product-meta">
          {vendor && (
            <span className="product-vendor">
              By <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link>
            </span>
          )}
        </div>

        <div className="product-price">
          {discountPrice ? (
            <>
              <span className="price-current">{discountPrice.toFixed(2)} MAD</span>
              <span className="price-original">{price.toFixed(2)} MAD</span>
            </>
          ) : (
            <span className="price-current">{price.toFixed(2)} MAD</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;