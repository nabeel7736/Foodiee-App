

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../storecontext/storecontext";
import { FaHeartCirclePlus, FaHeart } from "react-icons/fa6";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user,wishlist, removeFromWishlist,addToWishlist} =useContext(StoreContext);


  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3002/menuItems")
      .then((res) => res.json())
      .then((data) => {
        const uniqueItems = data.filter(
          (item, index, self) =>
            index === self.findIndex((i) => i.title === item.title)
        );
        setMenuItems(uniqueItems);
        setFilteredItems(uniqueItems);
      })
      .catch((err) => {
        console.error("Error fetching menu Items:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // search, filter
  useEffect(() => {
    let result = [...menuItems];

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      result = result.filter((item) =>
        item.title?.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (category !== "All") {
      result = result.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(result);
  }, [search, category, sort, menuItems]);

  const categories = ["All", "Biriyani", "Burger", "Dessert" , "Drinks", "Pizza"];

  const isInWishList =(itemId)=>{
    return wishlist?.some((item)=>item.id ===itemId)
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-yellow-400 text-2xl font-semibold">
        Loading menu...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 sm:px-10">
      <h2 className="text-4xl font-bold text-yellow-400 text-center mb-8">
        Explore Our Menu
      </h2>
      <p className="text-1xl text-center mb-8">
        explore our tasty dishes near you.
      </p>


      <div className="flex flex-wrap justify-center gap-5 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border border-yellow-400 w-60 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded border border-yellow-400 bg-yellow-400 font-semibold text-black"
        >
          {categories.map((item) => (
            <option key={item} value={item} className="bg-yellow-400 text-black">
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded border border-yellow-400 bg-yellow-400 font-semibold text-black"
        >
          <option value="" className="bg-yellow-400 text-black">
            Sort by
          </option>
          <option value="low" className="bg-yellow-400 text-black">
            Price: Low to High
          </option>
          <option value="high" className="bg-yellow-400 text-black">
            Price: High to Low
          </option>
        </select>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full mt-8">
            No matching items found.
          </p>
        ) : (
          filteredItems.map((item) => (
            
            <div
              key={item.id}
              className="bg-gray-700 p-4 rounded shadow hover:shadow-lg transition"
              // onClick={() =>  navigate(`/products/${item.id}`)}
            >
              
              <img
                src={item.img}
                alt={item.title || "Food item"}
                className="w-full h-40 object-cover rounded mb-2 hover:scale-105 transition duration-200"
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-yellow-400 font-bold">₹{item.price}</p>
              <p className="text-gray-400 capitalize">{item.category}</p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                   navigate(`/products/${item.id}`);
                }}
                className="mt-2 bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-300 cursor-pointer transition"
              >
                View Details
              </button>
              {user &&(
              <button
  onClick={(e) => {
    e.stopPropagation();
    wishlist.find((i) => i.id === item.id)
      ? removeFromWishlist(item.id)
      : addToWishlist(item);
  }}
  className={`mt-2 ml-45 py-2 px-3 rounded cursor-pointer transition ${
    wishlist.find((i) => i.id === item.id)
      ? 'bg-transparent text-red-400 hover:text-gray-600 hover:scale-50'
      : 'bg-transparent hover:scale-120 hover:text-green-300'
  }`}
>
  {wishlist.find((i) => i.id === item.id) ? <FaHeart size={30}/> : <FaHeartCirclePlus size={30}/>}
</button>
)}
              
            </div>
            
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;

