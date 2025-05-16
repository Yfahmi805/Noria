import React from 'react';
import { useParams, Link } from 'react-router-dom';
import vendors from '../assets/data/vendors';
import products from '../assets/data/products';
import './VendorDetail.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';

const VendorDetail = () => {
    const { id } = useParams();
    const vendor = vendors.find(v => v.id === parseInt(id));
    const vendorProducts = products.filter(p => p.vendorId === vendor?.id);

    if (!vendor) {
        return <div className="container section"><h2>Vendor not found</h2></div>;
    }

    return (
        <>
            <Navbar />
            <div className="container vendors-section">

                <div className="vendor-detail-header">
                    <img src={vendor.image} alt={vendor.name} className="vendor-detail-img" />
                    <div className="vendor-detail-info">
                        <h2>{vendor.name}</h2>
                        <p className="vendor-detail-location">{vendor.location}</p>
                        <p className="vendor-detail-rating">⭐ {vendor.rating}</p>
                        <p className="vendor-detail-description">{vendor.description}</p>
                    </div>
                </div>
                <h3 className="vendor-products-title">Products by {vendor.name}</h3>
                <div className="product-grid">
                    {vendorProducts.length === 0 ? (
                        <p>No products found for this vendor.</p>
                    ) : (
                        vendorProducts.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    )}
                </div>
                <div style={{ marginTop: '2rem' , marginBottom: '2rem'}}>
                    <Link to="/vendors" className="btn btn-outline">Back to Vendors</Link>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default VendorDetail;
