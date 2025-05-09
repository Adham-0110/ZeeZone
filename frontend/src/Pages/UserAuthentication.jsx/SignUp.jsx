import Navbar from "../../Components/navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/firebase";

function Signup() {
    const [name, setName] = useState(""); // Added name state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        // Check if password is exactly 6 alphanumeric characters
        const isValidPassword = /^[A-Za-z0-9]{6}$/.test(password);
        if (!isValidPassword) {
            setErr("Password must be exactly 6 characters (letters and/or numbers).");
            return;
        }
    
        if (password !== confirmPassword) {
            setErr("Passwords do not match");
            return;
        }
    
        try {
            const resp = await axios.post("/api/users/register", {
                name,
                email,
                password,
            });
    
            if (resp.status === 201) {
                alert("SignUp Successful");
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/login");
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            if (error.response?.data?.message) {
                setErr(error.response.data.message);
            } else {
                setErr("Something went wrong. Please try again.");
            }
        }
    };
    
    

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Signup Section */}
            <div className="bg-black text-green-400 py-16 px-8 flex justify-center items-center min-h-screen">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-extrabold text-center mb-6">Create an Account</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-6">
                            <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Re-enter your password"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Error Message */}
                        {err && <h5 style={{ color: "red" ,padding:"5px"}}>{err}</h5>}

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-300 shadow-md"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-green-400 hover:underline">Login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-green-400 py-6 text-center">
                <p className="text-sm text-green-500">© 2025 ZeeZone. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default Signup;
