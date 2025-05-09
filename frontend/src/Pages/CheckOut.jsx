import { useContext, useState, useEffect} from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod] = useState("Cash on Delivery"); 

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });
  
    
  }, []);
  

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ];

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      alert("You must be logged in to place an order.");
      setIsLoading(false);
      return;
    }

    const orderData = {
      userId: user.uid,
      name,
      address,
      city,
      state,
      pincode,
      cartItems,
      total: calculateTotalPrice(),
      paymentMethod,
    };

    try {
      const response = await axios.post("https://zeezone.onrender.com/api/orders", orderData);
      alert("Order placed successfully!");
      setCartItems([]);
      navigate("/home")
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <div className="bg-black text-green-400 py-16 px-8 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          {/* Shipping Information */}
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="">Select a state</option>
                  {states.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your pincode"
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            {/* Order Summary */}
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="mb-6 text-gray-400">
              {cartItems.map((item) => (
                <p key={item._id}>
                  {item.name}: ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              ))}
              <hr className="my-4" />
              <h3 className="text-xl font-bold">Total: ₹{calculateTotalPrice()}</h3>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="bg-green-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-300 shadow-md w-full"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
