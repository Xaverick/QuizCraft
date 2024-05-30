import { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import navbarlogo from '../../assets/homepageimages/navbarlogo.png';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname); // Set initial state to the current path

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link state on location change
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:4000/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
    }

    localStorage.removeItem('user');
    localStorage.removeItem('expiresIn');
    dispatch(logout());
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='nav'>
      <div className='navbar'>
        <div className='navbar-content'>
          <div className='navbar-LOGO'>
            <img src={navbarlogo} alt='logo'></img>
          </div>
          <div className='navbar-links'>
            <Link
              to="/"
              className={`navbar-link ${activeLink === '/' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Link>
            <Link
              to="/contest"
              className={`navbar-link ${activeLink === '/contest' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/contest')}
            >
              Contests
            </Link>
            <Link
              to="/leaderboard"
              className={`navbar-link ${activeLink === '/leaderboard' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/leaderboard')}
            >
              Leaderboard
            </Link>
            <Link
              to="/pricing"
              className={`navbar-link ${activeLink === '/pricing' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/pricing')}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className={`navbar-link ${activeLink === '/contact' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/contact')}
            >
              Contact
            </Link>
          </div>
          <div className='navbar-buttons'>
            <Link to="/login" className="navbar-button">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
