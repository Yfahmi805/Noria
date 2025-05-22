import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('categories').select('*');
            if (!error) setCategories(data || []);
            setLoading(false);
        };
        fetchCategories();
    }, []);

    if (loading) return (
        <div className="loading-spinner">
            <span className="spinner"></span>
            <span className="loading-text">Loading vendors...</span>
        </div>
    );

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