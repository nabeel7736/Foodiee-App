
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { user, cartItems, placeOrder, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax =Math.round(subtotal * 0.05)
  const deliverycharge =40
  const grandTotal =subtotal + tax + deliverycharge 

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/menu");
      return;
    }

    const orderDetails = {
      id: new Date().getTime(),
      userId: user.id,
      items: cartItems,
      subtotal,
      tax,
      deliverycharge,
      total : grandTotal,
      date: new Date().toLocaleString(),
      status: "Order Placed",
    };

    placeOrder(orderDetails); 
    // clearCart();
    navigate("/payment", {replace: true}); 
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
        Checkout
      </h1>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 border-b border-gray-600"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="text-yellow-400 font-semibold">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="mt-6 text-lg space-y-2">
          <div className="flex justify-between">
            <span>Subtotal :</span>
            <span className="text-yellow-300">₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
        <span>Tax (5%) :</span>
        <span className="text-yellow-300">₹{tax}</span>
          </div>
          <div className="flex justify-between">
         <span>Deliver Charge :</span>
         <span className="text-yellow-300">₹{deliverycharge}</span>
          </div>
          <div className="flex justify-between border-t border-gray-600 pt-4 mt-6 text-2xl font-extrabold">
        <span>Total :</span>
        <span className="text-yellow-300">₹{grandTotal}</span>
          </div>
        </div>
        {/* <div className="mt-6 flex justify-between text-xl font-bold border-t border-gray-600 pt-4">
          <span>Total:</span>
          <span className="text-yellow-400">₹{total}</span>
        </div> */}

        <button
          onClick={handlePlaceOrder}
          className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;

