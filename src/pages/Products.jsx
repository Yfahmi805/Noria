import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import './Products.css';
import { supabase } from '../supabaseClient';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="loading-spinner">
      <span className="spinner"></span>
      <span className="loading-text">Loading products...</span>
    </div>
  );

  return (
    <div className="products-page">
      <Navbar />
      <main>
        <section className="section">
          <div className="container">
            <h1 className="section-title">All Products</h1>
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;