import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../supabaseClient';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [vendorName, setVendorName] = useState(product.vendorName || '');

  const handleAddToCart = () => {
    addToCart(product);
  };

  const {
    id,
    name,
    price,
    image,
    category,
    discountPrice,
    rating,
    vendorid
  } = product;

  useEffect(() => {
    const fetchVendor = async () => {
      if (!vendorName && vendorid) {
        const { data, error } = await supabase
          .from('vendors')
          .select('name')
          .eq('id', vendorid)
          .single();
        if (!error && data) setVendorName(data.name);
      }
    };
    fetchVendor();
  }, [vendorid, vendorName]);

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
          {vendorName && (
            <span className="product-vendor">
              By {vendorName}
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