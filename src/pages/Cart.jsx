import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css'; // Assuming you have a CSS file for styling

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <Navbar />
      <main>
        <section className="section">
          <div className="container">
            <h1 className="page-title">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <FiShoppingCart size={64} />
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <Link to="/products">
                  <Button variant="primary">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="cart-container">
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-vendor">By {item.vendorName}</p>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                      <div className="cart-item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h3>Order Summary</h3>
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
                  <Link to="/checkout">
                    <Button
                      variant="primary"
                      fullWidth={true}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/products" className="continue-shopping">
                    <FiArrowLeft size={16} />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;