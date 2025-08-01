import React,{useContext, useEffect, useState,} from "react";
import { StoreContext } from "../storecontext/storecontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Myorder= ()=>{
    const {user} =useContext(StoreContext)
    const [orders, setOrders] =useState([])
    const navigate =useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/login')
            return
        }

        const fetchOrders=async()=>{
            try{
                const res =await axios.get("http://localhost:3002/orders")
                const userOrders =res.data
                .filter((order)=> order.userId===user.id)
                .sort((a,b)=>b.id- a.id)
                setOrders(userOrders)
            }catch(err){
                console.log("error fetching orders",err)
            }
        }

        fetchOrders()

    },[user,navigate])

    const cancelOrder = async (orderid) =>{
       const confirmcancel =window.confirm(
        "Are you sure you want to cancel this Order ?"
       )
       if(!confirmcancel) return

       try{
        await axios.patch(`http://localhost:3002/orders/${orderid}`,{status: "Order Cancelled",})

        setOrders((prev)=>{
            prev.map((order)=>{
                order.id === orderid
                ? {...order, status: "Order Cancelled"}
                : order
            })
        })
       }catch(err){
        console.log("Failed to cancel order",err)
        alert('Failed to cancel order. Try again')
       }
    }

    // const statusColor =(status)=>{
    //     if(status.toLowerCase().includes('cancelled')) return "text-red-500"
    //     if(status.toLowerCase().includes('Delivered')) return "text-green-500"
    //     if(status.toLowerCase().includes('placed')) return "text-yellow-400"
    //     return 'text-white'
    // }

    if(!user) return null;

    return(
        <div className="min-h-screen p-6 bg-gradient-to-br from-black to-gray-900 text-white">
          <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">My Orders</h1>

          {orders.length===0?(
            <p className="text-center text-gray-400">You have Not placed Any Orders yet.</p>
          ):(
            <div className="space-y-8 max-w-4xl mx-auto">
                {orders.map((order)=>(
                    <div key={order.id} className="bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-2 text-yellow-300">
                            Order #{order.id}
                        </h2>
                        <p className="mb-2 text-sm text-gray-400">Date : {order.date}</p>
                        <p className="mb-2">Payment : <span className="text-green-400">{order.paymentMethod}</span></p>
                        <p className="mb-2">Address : <span className="text-blue-300">{order.address}</span></p>
                        <p className="mb-2 font-semibold">Status : <span className='text-yellow-300'>{order.status}</span></p>
                        <p className="mb-4 font-bold">Total : ₹{order.total.toFixed(2)}</p>

                        <div className="border-t border-gray-600 pt-4">
                            <h3 className="font-semibold mb-2">Items:</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                                {order.items.map((item,index)=>(
                                    <li key={index}>
                                        {item.title} x {item.quantity} -₹{(item.price * item.quantity).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {order.status !== "Order Cancelled" &&
                        order.status &&
                        !order.status.toLowerCase().includes('delivered')&&(
                            <button
                            onClick={()=>cancelOrder(order.id)}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded">
                                Cancel Order 
                            </button>
                        )}
                    </div>
                ))}
            </div>
          ) }
        </div>
    )
}

export default Myorder;
