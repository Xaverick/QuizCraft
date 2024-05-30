import React, { useState, useEffect } from 'react';
import './Sidenavbar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import navbarlogo from '../../assets/homepageimages/navbarlogo.png';

const SideNavbar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        setActiveLink(location.pathname);

        if (showMenu) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [showMenu], [location]);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setShowMenu(false);
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
        <div className='side-nav'>
            <div className='side-navbar'>
                <div className='side-navbar-content'>
                    <div className='side-navbar-logo'>
                        <img src={navbarlogo} alt='logo' />
                    </div>
                    <div className='side-menu-icon' onClick={toggleMenu}>
                        {showMenu ? <RxCross1 size={24} color="black" /> : <RxHamburgerMenu size={24} color="black" />}
                    </div>
                    <div className={`side-navbar-links ${showMenu ? 'show' : ''}`}>
                        <Link
                            to="/"
                            className={`side-navbar-link ${activeLink === '/' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/')}
                        >
                            Home
                        </Link>
                        <Link
                            to="/contest"
                            className={`side-navbar-link ${activeLink === '/contest' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/contest')}
                        >
                            Contests
                        </Link>
                        <Link
                            to="/leaderboard"
                            className={`side-navbar-link ${activeLink === '/leaderboard' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/leaderboard')}
                        >
                            Leaderboard
                        </Link>
                        <Link
                            to="/pricing"
                            className={`side-navbar-link ${activeLink === '/pricing' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/pricing')}
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className={`side-navbar-link ${activeLink === '/contact' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/contact')}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/login"
                            className={`side-navbar-link ${activeLink === '/login' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('/login')}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
