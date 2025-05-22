import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import Button from '../common/Button';
import { supabase } from '../../supabaseClient';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').limit(12);
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

    if (loading) return (
    <div className="loading-spinner">
      <span className="spinner"></span>
      <span className="loading-text">Loading categories...</span>
    </div>
  );
  return (
    <section className="featured-products section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-grid">
          {products.map(product => (
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