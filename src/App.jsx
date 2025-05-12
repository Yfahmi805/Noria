import { React, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Search from './pages/Search';
import BottomNavbar from './components/layout/BottomNavbar';
import Popup from './components/common/Popup';

function App() {
  return (
    <CartProvider>
      <div>
        <BrowserRouter>
          <Popup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories/:slug" element={<CategoryDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <BottomNavbar />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
