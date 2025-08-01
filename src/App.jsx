
import React from "react";
import { Routes, Route} from "react-router-dom";

import Navbar from "./assets/Layout/Navbar";
import Home from "./assets/Hero/Home";
import Menu from "./assets/pages/Menu";
import ProductDetails from "./assets/pages/ProductDetails";
import Cart from "./assets/pages/Cart";
import ThankYou from "./assets/pages/ThankYou";
import Login from "./assets/pages/login";
import Register from "./assets/pages/register";
import About from "./assets/About/About";
import Contact from "./assets/Contact/Contact";
import Footer from "./assets/pages/footer";
import Wishlist from "./assets/pages/wishlist";
import Order from "./assets/pages/order";
import Payment from "./assets/pages/Payment";
import ProtectedRoute from "./assets/pages/protectRoute";
import Myorder from "./assets/pages/myOrder";



const App = () => {
  return (
    <>
  
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart"
         element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
         } />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" 
        element={
          <ProtectedRoute>
            <Wishlist/>
          </ProtectedRoute>
        } />
        <Route path="/order" 
        element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/payment"
         element={
          <ProtectedRoute>
            <Payment/>
          </ProtectedRoute>
         } />
        <Route path="/myorders"
         element={
          <ProtectedRoute>
            <Myorder/>
          </ProtectedRoute>
         } />
        
      </Routes>
        <Footer/>
    
    </>
  );
};

export default App;

