import React, { useState } from "react";
import Navbar from "../../Components/navbar";
import auth from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "Clothes",
        price: "",
        image: "",
    });
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://zeezone.onrender.com/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Product added successfully!");
                setFormData({ name: "", category: "Clothes", price: "", image: "" });
            } else {
                alert("Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <>
        <Navbar/>
            {
                admin ? (<form onSubmit={handleSubmit} className="p-8 bg-gray-900 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-green-400">Add Product</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-3 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="p-3 rounded w-full"
                        >
                            <option value="Clothes">Clothes</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Grooming">Grooming</option>
                            <option value="Fashion">Fashion</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="p-3 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            className="p-3 rounded w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-400 text-black font-bold p-3 rounded">
                        Add Product
                    </button>
                </form>) : (
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

export default AddProduct;
