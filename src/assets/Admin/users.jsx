
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/userDetails");
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       }finally{
//         setIsLoading(false)
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`http://localhost:3002/userDetails/${id}`);
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   const toggleBlockStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "active" ? "blocked" : "active";

//     try {
//       await axios.patch(`http://localhost:3002/userDetails/${id}`, { status: newStatus });
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user.id === id ? { ...user, status: newStatus } : user
//         )
//       );
//     } catch (err) {
//       console.error("Error updating user status:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
//       <h2 className="text-3xl font-semibold text-yellow-400 mb-6 text-center">Users Management</h2>

//       {isLoading ? (
//          <p className="text-center">Loading users...</p>
//       ):(
//        <div className="grid gap-6">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center"
//           >
//             <div className="mb-4 md:mb-0 w-full md:w-2/3">
//               <p className="text-lg font-medium">Name: {user.name}</p>
//               <p className="text-sm text-gray-400">Email: {user.email}</p>
//               <p className={`text-sm mt-1 font-semibold ${user.status === "active" ? "text-green-400" : "text-red-400"}`}>
//                 Status: {user.status}
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => navigate(`/admin/user/${user.id}`)}
//                 className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded shadow"
//               >
//                 View
//               </button>

//               <button
//                 type="button"
//                 onClick={() => toggleBlockStatus(user.id, user.status)}
//                 className={`px-4 py-2 ${
//                   user.status === "active"
//                     ? "bg-red-600 hover:bg-red-700"
//                     : "bg-green-600 hover:bg-green-700"
//                 } text-white font-medium rounded shadow`}
//               >
//                 {user.status === "active" ? "Block" : "Unblock"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => handleDelete(user.id)}
//                 className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded shadow"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       )}

      
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserItem from "./useItem";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true); // Start loading
        const res = await axios.get("http://localhost:3002/userDetails");
        setUsers(res.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later."); // Set user-friendly error message
      } finally {
        setIsLoading(false); // Stop loading, regardless of outcome
      }
    };
    fetchUsers();
  }, []);

  // const handleDelete = async (id) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this user?");
  //   if (!confirmed) return;

  //   try {
  //     await axios.delete(`http://localhost:3002/userDetails/${id}`);
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  //   } catch (err) {
  //     console.error("Error deleting user:", err);
  //     // You could add a temporary UI notification here
  //   }
  // };

   const handleDelete = useCallback(async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      await axios.delete(`http://localhost:3002/userDetails/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }, []);

  // const toggleBlockStatus = async (id, currentStatus) => {
  //   const newStatus = currentStatus === "active" ? "blocked" : "active";

  //   try {
  //     await axios.patch(`http://localhost:3002/userDetails/${id}`, { status: newStatus });
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user.id === id ? { ...user, status: newStatus } : user
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Error updating user status:", err);
  //     // You could add a temporary UI notification here
  //   }
  // };

   const toggleBlockStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await axios.patch(`http://localhost:3002/userDetails/${id}`, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  }, []); 

  return (
 <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <h2 className="text-3xl font-semibold text-yellow-400 mb-6 text-center">Users Management</h2>
      <div className="grid gap-6">
        {users.map((user) => (
          <UserItem 
            key={user.id} 
            user={user} 
            onDelete={handleDelete} 
            onToggleBlock={toggleBlockStatus} 
          />
        ))}
      </div>
    </div>



    // <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
    //   <h2 className="text-3xl font-semibold text-yellow-400 mb-6 text-center">Users Management</h2>

    //   {/* Conditional rendering based on state */}
    //   {isLoading ? (
    //     <p className="text-center text-lg">Loading users...</p>
    //   ) : error ? (
    //     <p className="text-center text-red-500 text-lg">{error}</p>
    //   ) : (
    //     <div className="grid gap-6">
    //       {users.map((user) => (
    //         <div
    //           key={user.id}
    //           className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center"
    //         >
    //           <div className="mb-4 md:mb-0 w-full md:w-2/3">
    //             <p className="text-lg font-medium">Name: {user.name}</p>
    //             <p className="text-sm text-gray-400">Email: {user.email}</p>
    //             <p className={`text-sm mt-1 font-semibold ${user.status === "active" ? "text-green-400" : "text-red-400"}`}>
    //               Status: {user.status}
    //             </p>
    //           </div>

    //           <div className="flex gap-3">
    //             <button
    //               type="button"
    //               onClick={() => navigate(`/admin/user/${user.id}`)}
    //               className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded shadow"
    //             >
    //               View
    //             </button>

    //             <button
    //               type="button"
    //               onClick={() => toggleBlockStatus(user.id, user.status)}
    //               className={`px-4 py-2 ${
    //                 user.status === "active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
    //               } text-white font-medium rounded shadow`}
    //             >
    //               {user.status === "active" ? "Block" : "Unblock"}
    //             </button>

    //             <button
    //               type="button"
    //               onClick={() => handleDelete(user.id)}
    //               className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded shadow"
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default Users;
