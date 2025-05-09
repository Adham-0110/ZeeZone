import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
    const { cartItems, addItemQuantity, subtractItemQuantity, removeItem } = useContext(CartContext);
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleExProducts = () => {
        navigate("/productListing");
    };

    return (
        <div className="bg-gray-900 text-white py-16 px-8 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

            {cartItems.length > 0 ? (
                <div className="container mx-auto">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg mb-4 shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400"
                                    onClick={() => addItemQuantity(item._id)}
                                >
                                    +
                                </button>
                                <button
                                    className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-400"
                                    onClick={() => subtractItemQuantity(item._id)}
                                    disabled={item.quantity === 1}
                                >
                                    -
                                </button>
                                <button
                                    className="bg-yellow-500 px-3 py-2 rounded text-white hover:bg-yellow-400"
                                    onClick={() => removeItem(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h2 className="text-xl font-bold text-right mt-8">Total: ₹{calculateTotalPrice()}</h2>

                    <button
                        className="bg-green-400 text-black font-bold py-2 px-6 rounded-full hover:bg-green-300 transition duration-300 mt-4 float-right"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <h2 className="text-2xl font-semibold text-gray-400 mb-4">
                        Your cart is currently empty!
                    </h2>
                    <p className="text-lg text-gray-500 mb-6">
                        Looks like you haven’t added anything to your cart yet. Start exploring our
                        products and find something you love!
                    </p>
                    <button
                        className="bg-green-400 text-black font-bold py-2 px-6 rounded-full hover:bg-green-300 transition duration-300"
                        onClick={handleExProducts}
                    >
                        Explore Products
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
