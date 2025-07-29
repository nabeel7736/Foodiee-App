

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { loginUser,user } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password){
        setError("Please enter both email and password");
        return ;
    }

    const success = await loginUser(email, password);

    if (!success) {
      setError("Invalid email or password.");
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-800">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 sm:px-10 py-20 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full font-bold bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
