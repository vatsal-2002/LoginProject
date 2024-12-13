import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mt-6">Users List</h1>
      <div className="w-full max-w-4xl mt-8 bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              {["Name", "Email", "Mobile", "City", "State"].map((header) => (
                <th
                  key={header}
                  className="py-3 px-4 text-left font-semibold uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.email}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.mobile}</td>
                  <td className="py-3 px-4">{user.city}</td>
                  <td className="py-3 px-4">{user.state}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-3 px-4 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
