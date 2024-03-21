import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const { user } = useSelector((state) => state.profile); 

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>
        <ul className="flex space-x-4">
          {!user ? (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-white hover:text-gray-300">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
