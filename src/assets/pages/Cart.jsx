
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../storecontext/storecontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { user, cartItems, addToCart, updateQuantity, removeFromCart, clearCart } =
        useContext(StoreContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate("/thankyou");
        } else {
            alert("Cart is empty!");
        }
        clearCart();
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">
                Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-gray-700 p-4 rounded shadow"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-20 h-20 rounded object-cover"
                            />

                            <div className="flex-1 px-6">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-yellow-400 font-semibold">₹{item.price}</p>

                                <div className="flex items-center mt-3 gap-3">
                                    <button
                                        onClick={() => handleDecrement(item)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-6 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded"
                                        title="Remove item"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <div className="text-right text-yellow-400 font-bold text-lg">
                                ₹{item.price * item.quantity}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-10 border-t border-yellow-400 pt-6">
                        <h2 className="text-2xl font-bold">Total:</h2>
                        <p className="text-2xl font-bold text-yellow-400">₹{totalPrice}</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-8  bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded mx-auto block"
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        onClick={() => navigate('/menu')}
                        className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded mx-auto block"
                    >
                        Continue shopping
                    </button>
                </div>
            )}
        
        </div>
    );
};

export default Cart;
