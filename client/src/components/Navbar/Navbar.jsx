import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaUserCircle } from 'react-icons/fa'; // Importing the profile icon from react-icons
import './Navbar.scss';
import navbarlogo from '../../assets/homepageimages/GeekClashLogo.svg';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State for profile menu
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setShowProfileMenu(false); // Close profile menu on link click
  };

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      dispatch(logout());
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {

    try {
      const response = await axios.get('/user/logout')
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
      navigate('/');

    }
    catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
      navigate('/');
    }

  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleProfileMenu = () => {
    navigate('/dashboard')
  };

  return (
    <div className='nav'>
      <div className='navbar'>
        <div className='navbar-content'>
          <div className='navbar-logo' >
            <Link to='/'> <img src={navbarlogo} alt='logo' /></Link>
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
              to="/contests"
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
              // to="/pricing"
              to="/comingsoon"
              className={`navbar-link ${activeLink === '/pricing' ? 'active' : ''}`}
              // onClick={() => handleLinkClick('/pricing')}
              onClick={() => handleLinkClick('/comingsoon')}
            >
              {/* Pricing */}
              Blog
            </Link>
            <Link
              to="/contact"
              className={`navbar-link ${activeLink === '/contact' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/contact')}
            >
              Contact
            </Link>
          </div>
          <div className='navbar-profile-buttons'>
            {isLoggedIn ? (
              <div className="profile-container">
                {/* <img src={user.picture} alt="" onClick={toggleProfileMenu}/> */}

                <FaUserCircle
                  size={30}
                  className="profile-icon"
                  onClick={toggleProfileMenu}
                />
                <button className="navbar-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar-button">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
