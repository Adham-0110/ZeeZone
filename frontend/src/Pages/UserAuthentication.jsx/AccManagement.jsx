import Navbar from "../../Components/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AccManagement = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                navigate("/login");
            }
        });

        // Fetch orders for the logged-in user
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders?userId=${user?.uid}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        if (user) {
            fetchOrders();
        }

        return () => unsubscribe();
    }, [auth, navigate, user]);

    const handleLogout = () => {
        signOut(auth).then(() => navigate("/login"));
    };

    const cancelOrder = async (id) => {
        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOrders(orders.filter(order => order._id !== id));
                alert("Order canceled successfully!");
            } else {
                alert("Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-black text-green-400 min-h-screen flex flex-col items-center py-20 px-8">
                <h1 className="text-5xl font-extrabold mb-6">Account Management</h1>
                <div className="w-3/4 sm:w-2/4 border-t border-green-400 mb-8"></div>

                {loading ? (
                    <p className="text-xl text-gray-400">Loading user data...</p>
                ) : user ? (
                    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-3/4 sm:w-2/4">
                        <h2 className="text-3xl font-bold mb-4">Profile Details</h2>
                        <p className="text-gray-400 text-lg"><span className="text-green-400 font-semibold">Email:</span> {user.email}</p>
                        <p className="text-gray-400 text-lg"><span className="text-green-400 font-semibold">Joined:</span> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p className="text-xl text-red-400">Failed to load user data. Please try again later.</p>
                )}

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <button onClick={handleLogout} className="bg-red-500 text-black font-semibold py-3 px-8 rounded-full shadow-md hover:bg-red-400 transition duration-300">
                        Logout
                    </button>
                </div>

                {/* Order Management  */}
                <div className="bg-black text-green-400 py-16 px-8 text-center">
                    <h1 className="text-5xl font-extrabold mb-6">My Orders</h1>
                    <p className="text-xl font-light mb-8">View and manage your orders.</p>

                    <div className="px-8 py-8 text-center">
                        {orders.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-gray-800 p-6 rounded-lg shadow-md text-left">
                                        <h3 className="text-xl font-semibold text-green-400 mb-2">Order ID: {order._id}</h3>
                                        <p className="text-gray-400 mb-2">Total: ₹{order.total}</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => cancelOrder(order._id)}
                                                className="bg-red-500 text-white font-semibold py-2 px-6 rounded shadow-md hover:bg-red-400 transition duration-300"
                                            >
                                                Cancel Order
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xl font-light text-gray-400">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-green-400 py-12 px-8 text-center">
                <p className="text-lg text-green-500">© 2025 ZeeZone. Order Management.</p>
            </footer>
        </>
    );
};

export default AccManagement;
