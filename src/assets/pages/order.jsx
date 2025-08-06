
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { user, cartItems, setCartItems } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [singleProduct, setSingleProduct] = useState(null);
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedAddress =localStorage.getItem('deliverAddress')
    if(savedAddress){
      setAddress(savedAddress)
    }

    if (location.state && location.state.singleProduct) {
      const productFromLocation = location.state.singleProduct;

      const withQuantity ={
        ...productFromLocation,
        quantity: productFromLocation.quantity || 1,
      }
      setSingleProduct(withQuantity)
    }
  }, [location, user, navigate]);


  const items = singleProduct ? [singleProduct] : cartItems;
 const subtotal = items .reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax =Math.round(subtotal * 0.05)
  const deliverycharge =30
  const total =subtotal + tax + deliverycharge 


  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    if(address.length <15){
      alert("Address must be atleast 15 charcters")
      return
    }

    if(address.length>160){
      alert('Address must be no more than 160 characters')
      return
    }
    localStorage.setItem('deliverAddress',address)

    const orderData = {
      userId: user.id,
      items: items,
      total,
      address,
      subtotal,
      tax,
      deliverycharge,
      paymentMethod,
      status: "Order Placed",
      date: new Date().toLocaleString(),
    };

    try {
      setIsPlacing(true);
      await axios.post("http://localhost:3002/orders", orderData);

      if (!singleProduct) {
        // Clear cart after placing order from cart
        setCartItems([]);
        localStorage.removeItem("cart");
      }

      // localStorage.removeItem("address");

      navigate("/thankyou", {state:{orderData}, replace: true});
    } catch (err) {
      console.error("Order placement failed:", err)
      alert("Failed to place order")
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">Place Your Order</h1>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Delivery Address:</label>
          <textarea
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              localStorage.setItem("deliverAddress", e.target.value);
            }}
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="UPI">UPI</option>
            <option value="COD">Cash On Delivery</option>
            <option value="ATM">ATM Card</option>
          </select>
        </div>

        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="space-y-2 mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-600 pt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>₹{deliverycharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-yellow-400 text-lg">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={isPlacing}
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
        >
          {isPlacing ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Order;
