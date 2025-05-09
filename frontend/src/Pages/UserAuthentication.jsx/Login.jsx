import Navbar from "../../Components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/firebase";

function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
            if(user){
                navigate("/home")
            }
        })
    },[])
  
    function handleemailChange(event) {
      setemail(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    const handleSubmit = async (evt) => {
      evt.preventDefault();
  
      try {
          const resp = await axios.post("/api/users/login", { email, password });
  
          if (resp.status === 200) {
              alert("Login Successful");
              await signInWithEmailAndPassword(auth,email,password)
                navigate("/home")
          } else {
              setErr(resp.data.error.message);  
          }
  
          console.log("Response", resp);
      } catch (error) {
        
        if (error.response.data.message) {
            setErr(error.response.data.message);
        } else {
            setErr("Something went wrong. Please try again.");
        }
          console.error("Error occurred:", error.response.data.message);
      }
  }
  
    return (
        <>
            {/* Navbar */}
            <Navbar/>

            {/* Login Section */}
            <div className="bg-black text-green-400 py-16 px-8 flex justify-center items-center min-h-screen">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-extrabold text-center mb-6">Login to ZeeZone</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                onChange={handleemailChange}
                                value={email}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input
                                onChange={handlePasswordChange}
                                value={password}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {err && <h5 style={{color: "red"}}>{err}</h5>}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-green-300 transition duration-300 shadow-md"
                        >
                            Login
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <Link to={"/signUP"} className="text-green-400 hover:underline">Sign Up</Link>
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

export default Login;
