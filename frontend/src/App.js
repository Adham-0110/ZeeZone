import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import ProductDetail from "./Pages/ProductDetail";
import ShoppingCart from "./Pages/ShoppingCart";
import CheckOut from "./Pages/CheckOut";
import SignUp from "./Pages/UserAuthentication.jsx/SignUp";
import Login from "./Pages/UserAuthentication.jsx/Login";
import AccManagement from "./Pages/UserAuthentication.jsx/AccManagement";
import Error404 from "./Pages/Error404";
import Admin from "./Pages/adminAccess/admin";
import AddProduct from "./Pages/adminAccess/AddProduct";
import DeleteProduct from "./Pages/adminAccess/DeleteProduct";
import OrderManage from "./Pages/adminAccess/orderManage";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/productListing" element={<ProductListing />}></Route>
        <Route path="/productDetail" element={<ProductDetail />}></Route>
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
        <Route path="/checkOut" element={<CheckOut />}></Route>
        <Route path="/accManagement" element={<AccManagement />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/accManagement" element={<AccManagement/>}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/deleteProduct" element={<DeleteProduct />}></Route>
        <Route path="/orderManage" element={<OrderManage />}></Route>
        <Route path="*" element={<Error404 />}></Route>


      </Routes>

    </>
  );
}

export default App;
