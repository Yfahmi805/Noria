import React, { useState } from 'react';
import { FiSearch, FiFilter, FiTable,FiX} from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import products from '../assets/data/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        filterProducts(value, selectedCategory, sortOption);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setShowCategoryPopup(false);
        filterProducts(query, category, sortOption);
    };

    const handleSortChange = (sort) => {
        setSortOption(sort);
        setShowSortPopup(false);
        filterProducts(query, selectedCategory, sort);
    };

    const filterProducts = (searchQuery, category, sort) => {
        let results = products;

        if (searchQuery.trim() !== '') {
            results = results.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (category) {
            results = results.filter((product) => product.category === category);
        }

        if (sort === 'price-asc') {
            results.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            results.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(results);
    };

    return (
        <>
        <Navbar />
        <div className="search-page">
            <div className="search-header">
                <h1 className="section-title">Search Products</h1>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for products..."
                            value={query}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="filter-controls">
                        <button
                            className="filter-button"
                            onClick={() => setShowCategoryPopup(!showCategoryPopup)}
                        >
                            <FiTable/>
                            Categories 
                        </button>
                        {showCategoryPopup && (
                            <div className="popup">
                                <div className="closePopup">
                                    <button onClick={() => setShowCategoryPopup (!showCategoryPopup)}>
                                    <FiX size={18} />
                                    </button>
                                </div>
                                <ul>
                                    <li onClick={() => handleCategoryChange('')}>All Categories</li>
                                    <li onClick={() => handleCategoryChange('Cosmetics')}>Cosmetics</li>
                                    <li onClick={() => handleCategoryChange('Food')}>Food</li>
                                    <li onClick={() => handleCategoryChange('Honey & Bee Products')}>Honey & Bee Products</li>
                                    <li onClick={() => handleCategoryChange('Spices')}>Spices</li>
                                </ul>
                            </div>
                        )}
                        <button
                            className="sort-button"
                            onClick={() => setShowSortPopup(!showSortPopup)}
                        >
                            <FiFilter />Sort
                        </button>
                        {showSortPopup && (
                            <div className="popup">
                                <div className="closePopup">
                                    <button onClick={() => setShowSortPopup (!showSortPopup)}>
                                    <FiX size={18} />
                                    </button>
                                </div>
                                <ul>
                                    <li onClick={() => handleSortChange('price-asc')}>Price: Low to High</li>
                                    <li onClick={() => handleSortChange('price-desc')}>Price: High to Low</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="no-results">No products found.</p>
                )}
            </div>
        </div>   
        <Footer />    
        </>
    );
};

export default Search;