import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { FiArrowLeft, FiShoppingCart, FiHeart } from 'react-icons/fi';
import products from '../assets/data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState(0);
  const { addToCart } = useCart();

  // Find the product with the matching ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div>
        <Navbar />
        <main className="container section">
          <h2>Product not found</h2>
          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <Navbar />
      <main style={{padding:'0 10px'}}>
        <div className="container section">
          <div className="product-navigation">
            <Link to="/products" className="back-link">
              <FiArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>

          <div className="product-detail">
            <div className="product-gallery">
              <div className="product-main-image">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                />
              </div>

              <div className="product-thumbnails">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`product-thumbnail ${mainImage === index ? 'active' : ''}`}
                    onClick={() => setMainImage(index)}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>

              <div className="product-pricing">
                {product.discountPrice ? (
                  <>
                    <span className="product-price discount">${product.discountPrice.toFixed(2)}</span>
                    <span className="product-original-price">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="product-price">${product.price.toFixed(2)}</span>
                )}
              </div>

              <div className="product-vendor">
                <span>Sold by: {product.vendorName}</span>
              </div>

              <p className="product-description">{product.description}</p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="product-sizes">
                  <h3>Size</h3>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="productActions">
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                >
                  <FiShoppingCart size={18} />
                  Add to Cart
                </Button>

                <button className="wishlist-btn">
                  <FiHeart size={18} />
                  Save for Later
                </button>
              </div>

              <div className="product-meta">
                <div className="meta-item">
                  <span className="label">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="meta-item">
                  <span className="label">In Stock:</span>
                  <span>{product.stockCount} available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;