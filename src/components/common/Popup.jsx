import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Popup.css';

const Popup = () => {
    const { showPopup } = useContext(CartContext);


    if (!showPopup) return null;

    return (
        <div className="popup">
            <p>Product added to cart!</p>
        </div>
    );
};

export default Popup;
