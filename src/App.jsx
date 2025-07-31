
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
import protectedRoute from "./assets/pages/protectRoute";



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
          <protectedRoute>
            <Cart/>
          </protectedRoute>
         } />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" 
        element={
          <protectedRoute>
            <Wishlist/>
          </protectedRoute>
        } />
        <Route path="/order" 
        element={
          <protectedRoute>
            <Order/>
          </protectedRoute>
        } />
        <Route path="/payment"
         element={
          <protectedRoute>
            <Payment/>
          </protectedRoute>
         } />
        
      </Routes>
        <Footer/>
    
    </>
  );
};

export default App;

