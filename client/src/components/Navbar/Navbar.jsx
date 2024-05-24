import { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import navbarlogo from '../../assets/homepageimages/navbarlogo.png';
const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

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
            <img src={navbarlogo} alt=''></img>
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
              className={`navbar-link ${activeLink === '/contests' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/contests')}
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
            <button className='navbar-button'>Login</button>
          </div>
        </div>
      </div>
    </div>




    // <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
    //   <div className="navbar-left">
    //     <h1>LOGO</h1>
    //     <Link to="/" className="navbar-link">Home</Link>
    //     <Link to="/your-quizzes" className="navbar-link">Your Quizzes</Link>
    //     {/* <Link to="/take-quiz/:id" className="navbar-link">Take Quiz</Link> */}
    //     {/* <Link to="#" className="navbar-link">Services</Link> */}
    //   </div>
    //   <div className="navbar-right">
    //     <div className="menu-icon" onClick={toggleMenu}>
    //       <span></span>
    //       <span></span>
    //       <span></span>r
    //     </div>
    //     <div className={`menu-items ${showMenu ? 'show' : ''}`}>
    //       {!isLoggedIn ? (
    //         <>
    //           <Link to="login" className="navbar-link">Login</Link>
    //           <Link to="signup" className="navbar-link">Signup</Link>
    //         </>
    //       ) : (
    //         <a href="#" className="navbar-link" onClick={handleLogout}>Logout</a>
    //       )}
    //     </div>
    //   </div>
    // </nav>

  );
}

export default Navbar;
