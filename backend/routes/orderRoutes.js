import express from "express";
import Order from "../models/orders.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
    try {
        const { userId, name, address, city, state, pincode, cartItems, total, paymentMethod } = req.body;

        if (!name || !address || !city || !state || !pincode || !cartItems || !total) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newOrder = new Order({
            userId,
            name,
            address,
            city,
            state,
            pincode,
            cartItems,
            total,
            paymentMethod,
            status: "Pending" // Default status
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Something went wrong while placing the order." });
    }
});

// Fetch all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders." });
    }
});

// Update order status
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) return res.status(404).json({ message: "Order not found." });

        res.status(200).json({ message: "Order status updated successfully.", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Failed to update order status." });
    }
});

// Delete an order
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) return res.status(404).json({ message: "Order not found." });

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order." });
    }
});

export default router;
