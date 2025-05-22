import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [userId, setUserId] = useState(null);

    // On mount, check for existing session and listen for auth changes
    useEffect(() => {
        let unsubscribe = () => { };
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session && session.user) {
                setUserId(session.user.id);
            }
        };
        checkSession();
        // Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session && session.user) {
                setUserId(session.user.id);
            }
            // Do NOT set userId(null) here
        });
        unsubscribe = () => listener.subscription.unsubscribe();
        return unsubscribe;
    }, []);

    // Explicit logout handler
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserId(null);
        setCartItems([]);
    };

    // Load cart from Supabase on login
    useEffect(() => {
        if (!userId) return;
        const loadCart = async () => {
            const { data, error } = await supabase
                .from('carts')
                .select('items')
                .eq('user_id', userId)
                .single();
            if (data && data.items) setCartItems(data.items);
        };
        loadCart();
    }, [userId]);

    // Save cart to Supabase on change
    useEffect(() => {
        if (!userId) return;
        const saveCart = async () => {
            await supabase.from('carts').upsert({ user_id: userId, items: cartItems });
        };
        saveCart();
    }, [cartItems, userId]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, showPopup, clearCart, handleLogout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export { CartProvider };