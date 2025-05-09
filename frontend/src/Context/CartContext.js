import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const userId = "userIdFromLogin";

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(`https://zeezone.onrender.com/api/cart/${userId}`);
                setCartItems(res.data.cartItems || []); 
            } catch (err) {
                console.error("Failed to fetch cart:", err);
            }
        };
        fetchCart();
    }, [userId]);

    const saveCart = async (newCartItems) => {
        try {
            await axios.post(`https://zeezone.onrender.com/api/cart/${userId}`, { cartItems: newCartItems });
        } catch (err) {
            console.error("Failed to save cart:", err);
        }
    };

    const addItemQuantity = (id) => {
        const updated = cartItems.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updated);
        saveCart(updated);
    };

    const subtractItemQuantity = (id) => {
        const updated = cartItems.map(item =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updated);
        saveCart(updated);
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item._id !== id);
        setCartItems(updated);
        saveCart(updated);
    };

    //  ADD THIS NEW FUNCTION:
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);
        let updatedCart;

        if (existingItem) {
            updatedCart = cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        setCartItems(updatedCart);
        saveCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addItemQuantity,
            subtractItemQuantity,
            removeItem,
            addToCart, 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
