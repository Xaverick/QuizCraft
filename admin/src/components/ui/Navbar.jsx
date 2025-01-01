// Navbar.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiresIn");

        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        console.error("Error logging out:", errorData.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>
        <ul className="flex space-x-4">
          {!user ? (
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link onClick={handleLogout} className="text-white hover:text-gray-300">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
