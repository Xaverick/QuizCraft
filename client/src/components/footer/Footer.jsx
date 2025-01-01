import React from "react";
// import logo from "../../assets/homepageimages/GeekClash.svg";
import logo from "../../assets/homepageimages/navbarlogo2.svg";
import insta from "../../assets/Footerimages/Instagram.svg";
import twiter from "../../assets/Footerimages/Twitter.svg";
import facebook from "../../assets/Footerimages/Facebook.svg";
import linkedlin from "../../assets/Footerimages/LinkedIn.svg";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footercontent">
        <div className="content1">
          <div className="content1logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="content1content">
            <p>
              Geek Clash platform lets you complete globally across a variety of
              topics. Battle it out, climb the leaderboards, and connect with a
              vibrant community of fellow geeks.
            </p>
          </div>
          <div className="contnet1links">
            <a href="https://x.com/phicsit">
              <img src={twiter} alt="" />
            </a>
            <a href="https://www.linkedin.com/company/phicsit">
              <img src={linkedlin} alt="" />
            </a>
            <a href="https://www.instagram.com/phicsit.in">
              <img src={insta} alt="" />
            </a>
            <a href="https://www.facebook.com/PHICSIT">
              <img src={facebook} alt="" />
            </a>
          </div>
        </div>
        <div className="Links">
          <div className="content2">
            <div className="content2heading">
              <p>Quick Links</p>
            </div>
            <div className="content2points">
              <a href="/contests" >
                Contests
              </a>
              <a href="/leaderboard" >
                Leaderboard
              </a>
              <Link to="/comingsoon">
                {/* Premium */}
                Blogs
              </Link>
              <a href="">
                Advertise With Us
              </a>
              <a href="/signup">
                Sign Up
              </a>
            </div>
          </div>
          <div className="content3">
            <div className="content3heading">
              <p>Company</p>
            </div>
            <div className="content2points">
              <a href="about-us">
                About Us
              </a>
              <a href="">
                Privacy Policy
              </a>
              <a href="">
                Community Guidelines
              </a>
              <a href="">
                Code of Conduct
              </a>
              <a href="">
                Terms of Services
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright ©️ 2024 PHICSIT InfoTech Pvt. Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
