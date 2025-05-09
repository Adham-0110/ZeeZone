import React, { useState, useEffect } from "react";
import Navbar from "../../Components/navbar";
import auth from "../../config/firebase";
import { useNavigate } from "react-router-dom";


const OrderManage = () => {
    const [orders, setOrders] = useState([]);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User Logged In");
                // Check if the user is an admin
                if (user.uid === "pD9l508X1pbF1SrfcQ6Lhmxqwkg1") {
                    setAdmin(true);
                    console.log("Admin Logged In");
                } else {
                    setAdmin(false);
                }
            } else {
                console.log("User Logged Out");
            }
        });
        const fetchOrders = async () => {

            try {
                const response = await fetch("https://zeezone.onrender.com/api/orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`https://zeezone.onrender.com/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
                alert("Order status updated successfully!");
            } else {
                alert("Failed to update order.");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`https://zeezone.onrender.com/api/orders/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOrders(orders.filter(order => order._id !== id));
                alert("Order deleted successfully!");
            } else {
                alert("Failed to delete order.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />
            {
                admin ?(<>   <div className="bg-black text-green-400 py-16 px-8 text-center">
                <h1 className="text-5xl font-extrabold mb-6">Manage Orders</h1>
                <p className="text-xl font-light mb-8">View and update orders placed by customers.</p>
            </div>

            <div className="px-8 py-8 text-center">
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-gray-800 p-6 rounded-lg shadow-md text-left">
                                <h3 className="text-xl font-semibold text-green-400 mb-2">Order ID: {order._id}</h3>
                                <p className="text-gray-400 mb-2">Customer: {order.name}</p>
                                <p className="text-gray-400 mb-2">Total: ₹{order.total}</p>
                                <p className="text-gray-400 mb-4">Status: {order.status}</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                                        className="bg-green-400 text-black font-semibold py-2 px-6 rounded shadow-md hover:bg-green-300 transition duration-300"
                                    >
                                        Mark as Shipped
                                    </button>
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="bg-red-500 text-white font-semibold py-2 px-6 rounded shadow-md hover:bg-red-400 transition duration-300"
                                    >
                                        Delete Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl font-light text-gray-400">No orders found.</p>
                )}
            </div>
</>):((
                <div className="bg-black text-green-400 py-20 px-8 text-center flex flex-col items-center">
                    <h1 className="text-5xl font-extrabold mb-4 text-red-500">Access Denied</h1>
                    <p className="text-xl font-light mb-6 max-w-2xl text-gray-400">
                        You do not have admin privileges to access this page.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-green-400 text-black font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-300 transition duration-300 mt-6"
                    >
                        Return to Home
                    </button>
                </div>
            ))
            }

         
            {/* Footer */}
            <footer className="bg-black text-green-400 py-12 px-8 text-center">
                <p className="text-lg text-green-500">© 2025 ZeeZone. Order Management.</p>
            </footer>
        </>
    );
};

export default OrderManage;
