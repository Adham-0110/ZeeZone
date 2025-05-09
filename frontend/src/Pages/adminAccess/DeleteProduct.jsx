import React, { useState } from "react";
import Navbar from "../../Components/navbar";
import auth from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DeleteProduct = () => {
    const [productId, setProductId] = useState("");
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

    const handleChange = (e) => {
        setProductId(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Product deleted successfully!");
                setProductId("");
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (<>
    <Navbar/>
    {
        admin ? (  <form onSubmit={handleDelete} className="p-8 bg-gray-900 rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Delete Product</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={handleChange}
                    className="p-3 rounded w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-red-400 text-black font-bold p-3 rounded">
                Delete Product
            </button>
        </form>):(
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
                )
    }
      
        </>
    );
};

export default DeleteProduct;
