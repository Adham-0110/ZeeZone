import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import auth from "../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
    // Define state for the side menu
    const [isOpen, setIsOpen] = useState(false);

    //Navigator
    const navigate = useNavigate()

    const [log, setLog] = useState(false)
    const [admin,setAdmin] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setLog(true)
                console.log("User Logged In")
                //Function to Check admin or not
                if(user.uid === "pD9l508X1pbF1SrfcQ6Lhmxqwkg1"){
                    setAdmin(true)
                    console.log("Admin Logged In")
                }else{
                    setAdmin(false)
                }
            }
            else {
                setLog(false)
                console.log("User Logged Out")
            }
        })
    }, [])

    

    //Function to Logout
    const Logout = ()=>{
        signOut(auth)
        alert("Successfully Logged out")
    }

    // Function to toggle menu state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black text-green-400 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-8">
                {/* Logo */}
                <Link to={"/home"} className="text-green-400 text-2xl font-bold hover:text-green-300 transition duration-300">
                    ZeeZone
                </Link>

                {/* Links */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to={"/home"} className="hover:text-green-300 transition duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to={"/productListing"} className="hover:text-green-300 transition duration-300">Products</Link>
                    </li>
                    <li>
                        <Link to={"/shoppingCart"} className="hover:text-green-300 transition duration-300">Cart</Link>
                    </li>
                    <li>
                        <Link to={"/accManagement"} className="hover:text-green-300 transition duration-300">My Account</Link>
                    </li>
                    {
                        admin ?  <li>
                        <Link to={"/admin"} className="hover:text-green-300 transition duration-300">Admin</Link>
                    </li>:""
                    }
                   
                    {
                        log ? <li>
                            <button onClick={Logout} className="hover:text-green-300 transition duration-300">Logout</button>
                        </li> : <li>
                            <Link to={"/login"} className="hover:text-green-300 transition duration-300">Login</Link>
                        </li>
                    }


                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-green-400 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg id="menuicon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-5 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-16 left-0 w-52 h-screen z-50 md:hidden bg-black text-green-400 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <ul className="flex flex-col space-y-4 px-4 py-6 ">
                    <li>
                        <Link to={"/home"} className="hover:text-green-300 transition duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to={"/productListing"} className="hover:text-green-300 transition duration-300">Products</Link>
                    </li>
                    <li>
                        <Link to={"/shoppingCart"} className="hover:text-green-300 transition duration-300">Cart</Link>
                    </li>
                    <li>
                        {/* <a href="/account" className="hover:text-green-300 transition duration-300">Account</a> */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
