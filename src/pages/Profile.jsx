import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiUser, FiMail, FiLock, FiShoppingCart, FiHeart, FiBox, FiCalendar, FiLogOut } from 'react-icons/fi';
import './Profile.css';
import { useCart } from '../context/CartContext';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [orders, setOrders] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                setError('You must be logged in.');
                setLoading(false);
                setTimeout(() => navigate('/login'), 1500);
                return;
            }
            setUser(data.user);
            setLoading(false);
        };
        getUser();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;
        // Fetch recent orders
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            if (!error && data) setOrders(data);
        };
        // Fetch favorites
        const fetchFavorites = async () => {
            const { data, error } = await supabase
                .from('favorites')
                .select('product_id, products(*)')
                .eq('user_id', user.id);
            if (!error && data) setFavorites(data.map(f => f.products));
        };
        fetchOrders();
        fetchFavorites();
    }, [user]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) return <div className="loading-spinner"><span className="spinner"></span></div>;
    if (error) return <div className="container section"><h2>{error}</h2></div>;

    return (
    <>
         <Navbar />
        <div className="profile-page">
            <main className=" section profile-section profile-main-grid">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <FiUser className="profile-user-icon" />
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-title">Welcome, {user.email?.split('@')[0]}</h2>
                        <div className="profile-info-list">
                            <div><FiMail className="profile-info-icon" /><span>{user.email}</span></div>
                            {user.phone && <div><span>📱</span><span>{user.phone}</span></div>}
                            {user.created_at && (
                                <div><span><FiCalendar className="profile-info-icon" /></span><span>Joined: {new Date(user.created_at).toLocaleDateString()}</span></div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
                            <button className="btn  btn-outline profile-update-btn" onClick={() => setShowUpdateForm(v => !v)}>
                                {showUpdateForm ? 'Cancel' : 'Update Account'}
                            </button>
                            <button className="btn btn-outline profile-logout-btn" onClick={handleLogout}><FiLogOut/> Logout</button>
                        </div>
                    </div>
                </div>
                {showUpdateForm && (
                    <div className="profile-modal-overlay">
                        <form className="profile-form profile-modal" onSubmit={async e => {
                            e.preventDefault();
                            setUpdateError('');
                            setUpdateSuccess('');
                            let errorMsg = '';
                            if (newEmail) {
                                const { error } = await supabase.auth.updateUser({ email: newEmail });
                                if (error) errorMsg += error.message + ' ';
                                else setUpdateSuccess('Email updated!');
                            }
                            if (newPassword) {
                                const { error } = await supabase.auth.updateUser({ password: newPassword });
                                if (error) errorMsg += error.message + ' ';
                                else setUpdateSuccess('Password updated!');
                            }
                            if (!newEmail && !newPassword) errorMsg = 'Please enter a new email or password.';
                            setUpdateError(errorMsg.trim());
                            setNewEmail('');
                            setNewPassword('');
                        }}>
                            <button type="button" className="profile-modal-close" onClick={() => setShowUpdateForm(false)} style={{ position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', fontSize: '1.5rem', color: '#888', cursor: 'pointer' }}>&times;</button>
                            <h3>Update Account</h3>
                            <div className="input-icon-group">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="New Email"
                                    value={newEmail}
                                    onChange={e => setNewEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-icon-group">
                                <FiLock className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            {updateError && <div className="profile-error">{updateError}</div>}
                            {updateSuccess && <div className="profile-success" style={{ color: 'var(--color-olive)' }}>{updateSuccess}</div>}
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                        <div className="profile-modal-backdrop" onClick={() => setShowUpdateForm(false)}></div>
                    </div>
                )}
                <div className="profile-sections-grid">
                    <section className="profile-section-card">
                        <div className="profile-section-header"><FiShoppingCart className="profile-section-icon" /><h3>Your Cart</h3></div>
                        {cartItems.length === 0 ? <p className="profile-section-empty">Cart is empty.</p> : (
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.id}><span>{item.name}</span> <span className="profile-section-qty">x{item.quantity}</span></li>
                                ))}
                            </ul>
                        )}
                    </section>
                    <section className="profile-section-card">
                        <div className="profile-section-header"><FiBox className="profile-section-icon" /><h3>Recent Orders</h3></div>
                        {orders.length === 0 ? <p className="profile-section-empty">No recent orders.</p> : (
                            <ul>
                                {orders.map(order => (
                                    <li key={order.id}>
                                        <span>Order #{order.id}</span>
                                        <span className="profile-section-date">{new Date(order.created_at).toLocaleDateString()}</span>
                                        <span className="profile-section-status">{order.status}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                    <section className="profile-section-card">
                        <div className="profile-section-header"><FiHeart className="profile-section-icon" /><h3>Favorites</h3></div>
                        {favorites.length === 0 ? <p className="profile-section-empty">No favorites yet.</p> : (
                            <ul>
                                {favorites.map(product => (
                                    <li key={product.id}>{product.name}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

            </main>
            
        </div>
        <Footer />
    </>
    );
};

export default Profile;
