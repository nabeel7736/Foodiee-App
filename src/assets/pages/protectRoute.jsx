import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../storecontext/storecontext";

const protectedRoute =({children})=>{
    const {user} =useContext(StoreContext)
    
    if(!user){
        return <Navigate to='/login' replace />
    }
    return children;
}
export default protectedRoute
