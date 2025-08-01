
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./foodiee.jpeg";
import { StoreContext } from "../storecontext/storecontext";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(StoreContext);
  const [menuOpen,setMenuOpen]= useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 fixed top-0 right-0 left-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-gray-800 dark:text-white"
        >
          <img
            src={Logo}
            alt="Foodiee"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-yellow-500">foodish.</span>
        </Link>

        <ul className="hidden md:flex gap-6 items-center text-gray-800 dark:text-white font-medium ">
          <li className="hover:text-yellow-500">
            <Link
              to="/"
              className={isActive("/") ? "text-yellow-500 font-semibold" : ""}
            >
              Home
            </Link>
          </li>
          <li className="hover:text-yellow-500">
            <Link
              to="/menu"
              className={isActive("/menu") ? "text-yellow-500 font-semibold" : ""}
            >
              Menu
            </Link>
          </li>
          <li className="hover:text-yellow-500">
            <Link
              to="/cart"
              className={isActive("/cart") ? "text-yellow-500 font-semibold" : ""}
            >
              Cart
            </Link>
          </li>
          <li className="hover:text-yellow-500">
            <Link
              to="/about"
              className={isActive("/about") ? "text-yellow-500 font-semibold" : ""}
            >
              About
            </Link>
          </li>
          <li className="hover:text-yellow-500">
            <Link
              to="/contact"
              className={isActive("/contact") ? "text-yellow-500 font-semibold" : ""}
            >
              Contact
            </Link>
          </li>
          <li className="hover:text-yellow-500">
            <Link
              to="/wishlist"
              className={isActive("/wishlist") ? "text-yellow-500 font-semibold" : ""}
            >
              Favourites
            </Link>
          </li>
          {user && (
            <li className="text-yellow-400">Hi, {user.name}</li>
          )}
        {user &&(
          <li className="hover:text-yellow-500">
            <Link
              to="/myorders"
              className={isActive("/myorders") ? "text-yellow-500 font-semibold" : ""}
              >
              My Orders
            </Link>
          </li>
        )}
        </ul> 

        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              >
            <RiAccountPinCircleFill size={35}  className="text-yellow-500 cursor-pointer"/>
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 font-medium text-black px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden" >
          <button onClick={()=>setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-yellow-500 text-3xl"/>
            ):(
              <HiMenu className="text-yellow-500 text-3xl"/>
            )}

          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pt-4 pb-6  shadow-md dark:text-white font-medium text-right">
          <ul>
          {user && <li className="text-yellow-400">Hi, {user.name}</li>}
          <li><Link to="/" onClick={() => setMenuOpen(false)} className={isActive("/") ? "text-yellow-500 font-semibold " : ""}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setMenuOpen(false)} className={isActive("/menu") ? "text-yellow-500 font-semibold" : ""}>Menu</Link></li>
          <li><Link to="/cart" onClick={() => setMenuOpen(false)} className={isActive("/cart") ? "text-yellow-500 font-semibold" : ""}>Cart</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)} className={isActive("/about") ? "text-yellow-500 font-semibold" : ""}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)} className={isActive("/contact") ? "text-yellow-500 font-semibold" : ""}>Contact</Link></li>
          <li><Link to="/wishlist" onClick={() => setMenuOpen(false)} className={isActive("/wishlist") ? "text-yellow-500 font-semibold" : ""}>Favourites</Link></li>
          {user ? (
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-500 font-bold">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-6 py-2 rounded-full hover:scale-105 transition">
                Login
              </button>
            </Link>
          )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

