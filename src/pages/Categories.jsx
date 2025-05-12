import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../assets/data/categories';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Categories.css';

const Categories = () => {
    return (
        <>
            <Navbar />
            <div className="categories-page">

                <h1 className="section-title">Categories</h1>
                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link to={`/categories/${category.slug}`} key={category.id} className="categoryCard">
                            <img src={category.image} alt={category.name} className="category-image" />
                            <div className="category-info">
                                <h2 className="category-name">{category.name}</h2>
                                <p className="category-count">{category.count} Products</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Categories;