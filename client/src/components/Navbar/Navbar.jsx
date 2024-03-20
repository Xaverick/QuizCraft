import { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  const handleLogout = () => {
    setLoggedIn(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-link">All Quiz</Link>
        <Link to="/quiz/:id" className="navbar-link">Take Quiz</Link>
        {/* <Link to="#" className="navbar-link">Services</Link> */}
      </div>
      <div className="navbar-right">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-items ${showMenu ? 'show' : ''}`}>
          {!loggedIn ? (
            <>
              <Link to="login" className="navbar-link">Login</Link>
              <Link to="signup" className="navbar-link">Signup</Link>
            </>
          ) : (
            <a href="#" className="navbar-link" onClick={handleLogout}>Logout</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
