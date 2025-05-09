import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { CartContext } from "../Context/CartContext";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert("Product Added to Cart Successfully")
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://zeezone.onrender.com/api/products");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(({ name, category }) => {
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-black text-white py-16 px-8 text-center">
                <h1 className="text-5xl font-bold mb-6">Browse Products</h1>
                <p className="text-lg font-light">Find exactly what you need from our vast selection.</p>
            </div>

            {/* Filters Section */}
            <div className="py-6 px-8 bg-black text-white flex flex-col md:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="p-3 rounded-full text-gray-800 w-full md:w-2/5 mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-3 rounded-full text-gray-800 w-full md:w-2/5 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Fashion">Fashion</option>
                </select>
            </div>

            {/* Product Listing Section */}
            <div className="py-16 px-8 bg-gray-900">
                <h2 className="text-4xl font-bold text-center mb-10 text-green-400">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="p-6 bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition duration-300"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-lg mb-4" />
                            <h3 className="font-semibold text-xl text-green-400">{product.name}</h3>
                            <p className="text-gray-300">₹{product.price}</p>
                            <button
                                className="bg-green-400 text-black font-bold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductListing;
