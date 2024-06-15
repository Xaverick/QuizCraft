// import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Comingsoon.scss';

const Comingsoon = () => {
    return (
        <div className="comingsoon">
            <div className="content">
                <h1>We are Coming Soon</h1>
                <p>Join our waitlist and be the first to know when the exclusive PHICSIT
                    <br /> e-quiz Dashboard launches.</p>
                <button className="navbar-button">Notify Me</button>
                <div className="social-icons">
                    <a href='https://www.facebook.com/PHICSIT' target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
                    <a href='https://x.com/phicsit' target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
                    <a href="https://www.instagram.com/phicsit.in" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
                    <a href='https://www.linkedin.com/company/phicsit' target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
                </div>
            </div>
        </div>
    );
}

export default Comingsoon;
