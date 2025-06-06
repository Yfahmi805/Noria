import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { supabase } from '../supabaseClient';
import './Vendors.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Vendors = () => {
    const [search, setSearch] = useState('');
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendors = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('vendors').select('*');
            if (!error) setVendors(data || []);
            setLoading(false);
        };
        fetchVendors();
    }, []);

    const filteredVendors = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.location.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="loading-spinner">
            <span className="spinner"></span>
            <span className="loading-text">Loading vendors...</span>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="container vendors-section">
                <h2 className="section-title">Our Vendors</h2>
                <div className="vendor-search-bar">
                    <input
                        type="text"
                        placeholder="Search vendors by name or location..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="vendor-search-input"
                    />
                    <button className="vendor-search-btn" onClick={e => e.preventDefault()}>
                        <FiSearch size={20} />
                    </button>
                </div>
                <div className="vendor-grid">
                    {filteredVendors.length === 0 ? (
                        <p className="no-vendors">No vendors found.</p>
                    ) : (
                        filteredVendors.map(vendor => (
                            <div className="vendor-card" key={vendor.id}>
                                <Link to={`/vendors/${vendor.id}`}>
                                    <img src={vendor.image} alt={vendor.name} className="vendor-img" />
                                    <h3 className="vendor-name">{vendor.name}</h3>
                                </Link>
                                <p className="vendor-location">{vendor.location}</p>
                                <p className="vendor-rating">★ {vendor.rating}</p>
                                <p className="vendor-description">{vendor.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Vendors;
