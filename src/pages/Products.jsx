import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import './Products.css';
import products from '../assets/data/products';
const Products = () => {
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