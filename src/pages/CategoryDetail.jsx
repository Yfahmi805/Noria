import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/products/ProductCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './CategoryDetail.css';

const CategoryDetail = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            setLoading(true);
            const { data: catData, error: catError } = await supabase
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .single();
            if (!catError && catData) {
                setCategory(catData);
                const { data: prodData, error: prodError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', catData.name);
                if (!prodError) setProducts(prodData || []);
            }
            setLoading(false);
        };
        fetchCategoryAndProducts();
    }, [slug]);

    if (loading) return (
        <div className="loading-spinner">
            <span className="spinner"></span>
            <span className="loading-text">Loading...</span>
        </div>
    );
    if (!category) return <div>Category not found</div>;

    return (
        <>
            <Navbar />
            <div className="category-detail-page">
                <h1 className="section-title">{category.name}</h1>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CategoryDetail;