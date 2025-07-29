
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-yellow-400 mb-7 mt-4">About Us</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Welcome to <span className="text-yellow-500 font-semibold">foodish.</span> — your go-to place for authentic biriyani and quick bites. We combine tradition with convenience, bringing you freshly made dishes, lightning-fast delivery, and prices that don’t break the bank.
        </p>
        <p className="text-gray-400">
          Founded with a passion for flavor and service, we aim to deliver not just food, but an experience. Whether you're craving biriyani, burgers, or desserts, we have something to satisfy every craving.
        </p>
      </div>
    </div>
  );
};

export default About;
