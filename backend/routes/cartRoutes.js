import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cartItems: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user's cart
router.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { cartItems } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cartItems });
        } else {
            cart.cartItems = cartItems;
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
