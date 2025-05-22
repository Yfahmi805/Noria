import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';
import { FiCheck } from "react-icons/fi";
import './Checkout.css';

const Checkout = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user) setUser(data.user);
            setLoading(false);
        };
        getUser();
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 9.99 : 0;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Save order to Supabase
        await supabase.from('orders').insert([
            {
                user_id: user ? user.id : null,
                name: form.name,
                email: form.email,
                address: form.address,
                phone: form.phone,
                items: cartItems,
                subtotal,
                shipping,
                total,
                status: 'pending',
            }
        ]);
        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <Navbar />
                <main>
                    <section className="section">
                        <div className="container order-confirmation">
                            <FiCheck className="confirmation-icon" />
                            <h1>Thank you for your order!</h1>
                            <p>Your order has been placed successfully.</p>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <Navbar />
            <main>
                <section className="section">
                    <div className="container checkout-container">
                        <h1 className="page-title">Checkout</h1>
                        <div className="checkout-content">
                            <div className="checkout-form-section">
                                <h2>Shipping Information</h2>
                                <form className="checkout-form" onSubmit={handleSubmit}>
                                    <label>Name
                                        <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
                                    </label>
                                    <label>Email
                                        <input type="email" name="email" value={form.email} onChange={handleInputChange} required />
                                    </label>
                                    <label>Address
                                        <input type="text" name="address" value={form.address} onChange={handleInputChange} required />
                                    </label>
                                    <label>Phone
                                        <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} required />
                                    </label>
                                    <Button type="submit" variant="primary" fullWidth={true}>Place Order</Button>
                                </form>
                            </div>
                            <div className="checkout-summary-section">
                                <h2>Order Summary</h2>
                                <div className="checkout-items-list">
                                    {cartItems.length === 0 ? (
                                        <p>Your cart is empty.</p>
                                    ) : (
                                        cartItems.map(item => (
                                            <div key={item.id} className="checkout-item">
                                                <img src={item.image} alt={item.name} className="checkout-item-image" />
                                                <div className="checkout-item-info">
                                                    <span className="checkout-item-name">{item.name}</span>
                                                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                                                    <span className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="checkout-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="payment-section">
                                    <h2>Payment</h2>
                                    <div className="payment-methods">
                                        <label>
                                            <input type="radio" name="payment" value="card" defaultChecked disabled />
                                            <span>Credit/Debit Card (Demo Only)</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="payment" value="cod" disabled />
                                            <span>Cash on Delivery (Coming Soon)</span>
                                        </label>
                                    </div>
                                    <div className="payment-fields">
                                        <input type="text" placeholder="Card Number" disabled value="**** **** **** 4242" />
                                        <input type="text" placeholder="MM/YY" disabled value="12/34" />
                                        <input type="text" placeholder="CVC" disabled value="123" />
                                    </div>
                                    <div className="payment-note">* Payment is simulated for demo purposes.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
