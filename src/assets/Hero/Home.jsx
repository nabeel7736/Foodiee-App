
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../services/service';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Footer from '../pages/footer';


const Home = () => {
  const navigate = useNavigate();

  const handleOrderbtn = () => {
    navigate("/menu");
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-40 z-0" />

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            <div className="text-center sm:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-400 leading-tight">
                Welcome to <span className="text-white">foodish.</span> Restaurant
              </h1>
              <p className="text-base text-gray-200">
                Discover the taste of authentic biriyani with a modern twist. Prepared fresh & delivered fast.
              </p>
              <button
                onClick={handleOrderbtn}
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 font-semibold shadow-lg"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
        
      </div>

      <Service />
      <About />
      <Contact />
    </>
  );
};

export default Home;

