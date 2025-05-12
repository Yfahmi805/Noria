import React from 'react';
import { useParams } from 'react-router-dom';
import categories from '../assets/data/categories';
import products from '../assets/data/products';
import ProductCard from '../components/products/ProductCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './CategoryDetail.css';

const CategoryDetail = () => {
    const { slug } = useParams();
    const category = categories.find((cat) => cat.slug === slug);
    const filteredProducts = products.filter((product) => product.category === category.name);

    return (
        <>
        <Navbar />
        <div className="category-detail-page">
            <h1 className="section-title">{category.name}</h1>
            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
        <Footer />
        </>

    );
};

export default CategoryDetail;