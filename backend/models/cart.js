import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    cartItems: [
        {
            _id: String,
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 },
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
