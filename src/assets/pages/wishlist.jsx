import React, { useContext,useEffect } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user,wishlist, removeFromWishlist } = useContext(StoreContext);
  const navigate = useNavigate();

   useEffect(() => {
          if (!user) {
              navigate("/login");
          }
      }, [user, navigate]);

      if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 mt-15">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Your Favourite Dishes</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">You are No choose Favourite Foods.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-yellow-400">₹{item.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item.id);
                }}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
