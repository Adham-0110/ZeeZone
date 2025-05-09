import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new product (admin only)
router.post("/", async (req, res) => {
    const { name, category, price, image } = req.body;
    try {
        const product = new Product({ name, category, price, image });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
