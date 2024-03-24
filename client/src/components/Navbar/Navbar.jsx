import { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    const response = await fetch('http://localhost:4000/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      
    });

    if (response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
    }

    else{
      console.log('Logout failed');
    }

  };



  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
      <div className="navbar-left">
        <h1>LOGO</h1>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/your-quizzes" className="navbar-link">Your Quizzes</Link>
        {/* <Link to="/take-quiz/:id" className="navbar-link">Take Quiz</Link> */}
        {/* <Link to="#" className="navbar-link">Services</Link> */}
      </div>
      <div className="navbar-right">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-items ${showMenu ? 'show' : ''}`}>
          {!isLoggedIn ? (
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
