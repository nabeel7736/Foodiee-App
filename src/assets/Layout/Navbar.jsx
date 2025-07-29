
import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./foodiee.jpeg";
import { StoreContext } from "../storecontext/storecontext";
import { RiAccountCircle2Fill } from "react-icons/ri";

const Navbar = () => {
  const { user, logout } = useContext(StoreContext);
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

        <ul className="flex gap-6 items-center text-gray-800 dark:text-white font-medium ">
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
          {user && (
            <li className="text-yellow-400">Hi, {user.name}</li>
          )}
        </ul>

        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-medium px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
              >
            <RiAccountCircle2Fill size={25} />
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 font-medium text-black px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

