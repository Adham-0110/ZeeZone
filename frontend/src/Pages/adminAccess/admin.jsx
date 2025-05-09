import Navbar from "../../Components/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../config/firebase";

function Admin() {
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
    }, []);

    const handleAddProduct = () => {
        navigate("/addProduct")
    }

    const handleDltProduct = () => {
        navigate("/deleteProduct")
    }

    const handleOrderManagement = ()=>{
        navigate("/orderManage")
    }
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {admin ? (
                <>
                    {/* Admin Dashboard */}
                    <div className="bg-black text-green-400 py-20 px-8 text-center flex flex-col items-center">
                        <h1 className="text-6xl font-extrabold mb-4">Welcome to ZeeZone Admin Panel</h1>
                        <p className="text-xl font-light mb-6 max-w-2xl">
                            Take full control of your store. Add new products, update inventory, and ensure a seamless shopping experience for your customers.
                        </p>
                        <div className="w-3/4 sm:w-2/4 border-t border-green-400 mt-6"></div>
                    </div>

                    {/* Admin Privileges Section */}
                    <div className="py-20 px-8 bg-gray-900 text-center">
                        <h2 className="text-4xl font-bold text-green-400 mb-10">Admin Privileges</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                            <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Inventory Management</h3>
                                <p className="text-gray-400 mt-2">Keep track of stock levels and update product listings effortlessly.</p>
                            </div>
                            <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Customer Orders</h3>
                                <p className="text-gray-400 mt-2">View, process, and manage customer orders with ease.</p>
                            </div>
                            <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Store Analytics</h3>
                                <p className="text-gray-400 mt-2">Analyze sales trends and optimize your business strategy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions Section */}
                    <div className="py-20 px-8 text-center">
                        <h2 className="text-4xl font-bold text-green-400 mb-10">Manage Your Store</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
                            <div onClick={handleAddProduct} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Add Products</h3>
                                <p className="text-gray-400 mt-2">Expand your store by adding new products instantly.</p>
                            </div>
                            <div onClick={handleDltProduct} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Delete Products</h3>
                                <p className="text-gray-400 mt-2">Remove outdated or discontinued products seamlessly.</p>
                            </div>
                            <div onClick={handleOrderManagement} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold text-green-400">Order Management</h3>
                                <p className="text-gray-400 mt-2">View, update, and track customer orders efficiently.</p>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
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
            )}

            {/* Footer */}
            <footer className="bg-black text-green-400 py-12 px-8 text-center">
                <p className="text-lg text-green-500">© 2025 ZeeZone. Admin Panel.</p>
            </footer>
        </>
    );
}

export default Admin;
