import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiMail, FiLock, FiPhone } from 'react-icons/fi';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Sign up with email and phone (phone is stored as metadata)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { phone }
      }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/login'); // Ask user to check email for verification
    }
  };

  return (
    <div className="signup-page">
      <Navbar />
      <main className="container section auth-section">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-icon-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-icon-group">
            <FiPhone className="input-icon" />
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="input-icon-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
