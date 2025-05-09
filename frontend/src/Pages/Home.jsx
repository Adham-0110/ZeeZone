import Navbar from "../Components/navbar";
import { useNavigate,Link } from "react-router-dom";
import c1 from '../assets/images/clothes/c1.jpg';
import g1 from '../assets/images/grooming/g1.webp';
import e1 from '../assets/images/electronics/e1.jpg'
import w1 from "../assets/images/fashion/w1.jpg"
import { useState } from "react";




function Home() {
    const [sub,setSub] = useState("")
    const navigate = useNavigate()
    const HandleHomePage = ()=>{
        navigate("/productListing")
    }
    const handleSub = (e) => {
        e.preventDefault(); 
      
        if (!sub.trim()) {
          alert("Please enter your email to subscribe.");
          return;
        }
      
        console.log("Subscribed:", sub);
        alert("You Have Subscribed Successfully to ZeeZone...!");
        setSub(""); 
      };
      
    return (
        <>
            {/*Navbar*/}
            <Navbar/>

            {/* Hero Section */}
            <div className="bg-black text-green-400 py-16 px-8 text-center">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to ZeeZone!</h1>
                <p className="text-xl font-light mb-6">Discover the best deals and trendy products all in one place.</p>
                <button onClick={HandleHomePage} className="bg-green-400 text-black font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-300 transition duration-300">
                    Shop Now
                </button>
            </div>

            {/* Categories Section */}
            <div className="py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-10 text-green-400">Explore Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div onClick={HandleHomePage} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={c1} alt="Men's Fashion" className=" h-52 w-80 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-xl text-green-400">Clothes</h3>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={e1} alt="Men's Fashion" className="w-80 h-52 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-xl text-green-400">Electronics Gadgets</h3>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={g1} alt="Men's Fashion" className="w-80 h-52 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-xl text-green-400">Grooming</h3>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={w1} alt="Men's Fashion" className="w-80 h-52 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-xl text-green-400">Fashion</h3>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            {/* <div className="py-16 px-8 bg-gray-900">
                <h2 className="text-3xl font-bold text-center mb-10 text-green-400">Top Picks for You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div onClick={HandleHomePage} className="p-6 bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={e2} alt="Product Name" className="w-full h-60 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg text-green-400">Boat E6</h3>
                        <p className="text-gray-400">₹1,099</p>
                        <button className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={e6} alt="Product Name" className="w-full h-60 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg text-green-400">IPhone 15 Pro Max</h3>
                        <p className="text-gray-400">₹1,44,899</p>
                        <button className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={g8} alt="Product Name" className="w-full h-60 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg text-green-400">Musk The Men company</h3>
                        <p className="text-gray-400">₹584</p>
                        <button className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                    <div onClick={HandleHomePage} className="p-6 bg-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <img src={g10} alt="Product Name" className="w-full h-60 object-cover rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg text-green-400">Beardo Styling Gun Ultra Compact Hair Dryer</h3>
                        <p className="text-gray-400">₹1,499</p>
                        <button className="bg-green-400 text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-green-300 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div> */}

            {/* Newsletter Signup Section */}
            <div className="py-16 bg-black text-green-400 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-6">Subscribe for exclusive offers and updates from ZeeZone.</p>
                <form className="flex justify-center" onSubmit={(e) => e.preventDefault()}>
                    <input
                        required
                        value={sub}
                        onChange={(e)=>{setSub(e.target.value)}}
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 rounded-l-lg text-gray-800 w-2/3 sm:w-1/3 focus:outline-none"
                    />
                    <button type="button" onClick={handleSub} className="bg-green-400 text-black font-semibold py-3 px-6 rounded-r-lg hover:bg-green-300 transition duration-300">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-black text-green-400 py-10 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">ZeeZone</h3>
                        <p>Your ultimate shopping destination.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul>
                            <li><Link to={"/"} className="hover:underline text-green-400">Home</Link></li>
                            <li><Link to={"/productListing"} className="hover:underline text-green-400">Products</Link></li>
                            <li> <Link to={"/shoppingCart"} className="hover:underline text-green-400">Cart</Link></li>
                        </ul>
                    </div>
                    {/* Add more columns for About Us, Social Media, etc. */}
                </div>
                <p className="text-center mt-8 text-green-500">© 2025 ZeeZone. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default Home;
