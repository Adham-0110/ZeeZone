import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import e3 from '../assets/images/electronics/e3.webp';

function ProductDetail() {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Product Detail Section */}
            <div className="bg-black text-green-400 py-16 px-8 min-h-screen">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Product Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={e3}
                            alt="Wireless Headphones"
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Product Information */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Wireless Headphones</h1>
                        <p className="text-xl text-gray-300 mb-6">
                            Experience immersive sound quality with our state-of-the-art Wireless Headphones.
                            Designed for comfort and premium audio, they are perfect for music enthusiasts and professionals.
                        </p>
                        <p className="text-2xl font-semibold mb-4">Price: ₹2,999</p>

                        {/* Options */}
                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-lg font-medium mb-2">
                                Quantity:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                defaultValue="1"
                                className="w-20 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        {/* Add to Cart and Buy Now Buttons */}
                        <div className="flex gap-4">
                            <button className="bg-green-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-300 shadow-md">
                                Add to Cart
                            </button>
                            <button className="bg-gray-800 text-green-400 font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="py-16 px-8 bg-gray-900">
                <h2 className="text-3xl font-bold text-center mb-10 text-green-400">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Related Product Card */}
                    <div className="p-6 bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={e3} alt="Product Name" className="w-full h-60 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg text-green-400">Wireless Headphones</h3>
                        <p className="text-gray-400">₹2,999</p>
                        <button className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                    {/* Add more related products as needed */}
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    );
}

export default ProductDetail;
