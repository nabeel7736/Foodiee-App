import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user, cartItems, placeOrder, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user || cartItems.length === 0) {
      navigate("/order");
    }

    const saveaddress =localStorage.getItem('deliveryAddress')
    if(saveaddress){
      setAddress(saveaddress)
    }
  }, [user, cartItems, navigate]);

  if (!user || cartItems.length === 0) return null;

  const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.05 + 40;


  const handlePayment = () => {
     
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }
    if(address.length< 15){
      alert("Address must be atleast 15 Characters.")
      return
    }
    if(address.length > 160){
      alert("Address must be no more than 160 characters.")
      return
    }

    localStorage.setItem('deliveryAddress',address)

    const orderDetails = {
      id: new Date().getTime(),
      userId: user.id,
      items: cartItems,
      total: parseFloat(grandTotal.toFixed(2)),
      paymentMethod,
      address,
      date: new Date().toLocaleString(),
      status: `Order Placed - ${paymentMethod}`,
    };

    placeOrder(orderDetails);
    navigate("/thankyou", {replace: true})
    // clearCart();
   
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">Payment</h1>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>

        <textarea
          rows="4"
          className="w-full p-3 rounded bg-gray-700 text-white mb-6 resize-none"
          placeholder="Enter your full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>

        <div className="flex flex-col space-y-4 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
              className="mr-2"
            />
            <span>UPI (Google Pay, PhonePe, Paytm, etc.)</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
              className="mr-2"
            />
            <span>Cash On Delivery (COD)</span>
          </label>
        </div>

        <div className="text-xl font-bold mb-4 border-t pt-4 border-gray-600">
          <p>Grand Total: <span className="text-yellow-400">₹{grandTotal.toFixed(2)}</span></p>
        </div>

        <button
          onClick={handlePayment}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded w-full"
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
