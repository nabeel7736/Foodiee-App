
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  const [orders, setOrders] = useState([]);

  const API = "http://localhost:3002";


const [cartItems, setCartItems] = useState(() => {
  if (user?.id) {
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }
  }
  return [];
});


  
  useEffect(() => {
    
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
     
    }
  }, [cartItems, user?.id]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

 
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };


 const clearCart = () => {
    setCartItems([]);
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

 
 const registerUser = async (newUser) => {
    try {
      const { data } = await axios.get(
        `${API}/userDetails?email=${newUser.email}`
      );
      if (data.length) return false;      
      await axios.post(`${API}/userDetails`, newUser);
      return true;
    } catch (err) {
      console.error("Register error:", err);
      return false;
    }
  };


  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.get(
        `${API}/userDetails?email=${email}&password=${password}`
      );
      if (data.length === 1) {
        const { password: _, ...userWithoutPassword } = data[0];
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        return true;
      }else{
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };
   const logout = () => {
    setUser(null);
    setCartItems([]);
    setOrders([]);
    localStorage.removeItem("user");
  };

  const placeOrder = async (order) => {
    try {
      await axios.post(`${BASE_URL}/orders`, order);
      setOrders((prev) => [...prev, order]);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  const [wishlist, setWishlist] = useState(() => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error parsing wishlist from localStorage:", error);
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

 const addToWishlist = (item) => {
  const exists = wishlist.find((i) => i.id === item.id);
  if (!exists) {
    const updated = [...wishlist, item];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }
};

 const removeFromWishlist = (itemId) => {
  const updated = wishlist.filter((item) => item.id !== itemId);
  setWishlist(updated);
  localStorage.setItem("wishlist", JSON.stringify(updated));
};

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        placeOrder,
        logout,
        loginUser,
        registerUser,
        setCartItems,
        addToWishlist,
        removeFromWishlist,
        wishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
