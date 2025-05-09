// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      _id: false,
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "Cash on Delivery" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
