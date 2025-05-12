import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import Button from '../common/Button';
import products from '../../assets/data/products';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  return (
    <section className="featured-products section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-grid">
          {products.slice(0, 12).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="featured-action">
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;