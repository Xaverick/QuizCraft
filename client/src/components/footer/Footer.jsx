import React from "react";
import logo from "../../assets/homepageimages/GeekClash.svg";
import insta from "../../assets/Footerimages/Instagram.svg";
import twiter from "../../assets/Footerimages/Twitter.svg";
import facebook from "../../assets/Footerimages/Facebook.svg";
import linkedlin from "../../assets/Footerimages/LinkedIn.svg";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footercontent">
        <div className="content1">
          <div className="content1logo">
            <img src={logo} alt="" />
          </div>
          <div className="content1content">
            <p>
              Geek Clash platform lets you complete globally across a variety of
              topics. Battle it out, climb the leaderboards, and connect with a
              vibrant community of fellow geeks.
            </p>
          </div>
          <div className="contnet1links">
            <a href="https://www.instagram.com/phicsit.in">
              <img src={insta} alt="" />
            </a>
            <a href="https://www.facebook.com/PHICSIT">
              <img src={facebook} alt="" />
            </a>
            <a href="https://x.com/phicsit">
              <img src={twiter} alt="" />
            </a>
            <a href="https://www.linkedin.com/company/phicsit">
              <img src={linkedlin} alt="" />
            </a>
          </div>
        </div>
        <div className="content2">
          <div className="content2heading">
            <p>Quick Links</p>
          </div>
          <div className="content2points">
            <p>Contest</p>
            <p>Leaderboard</p>
            <p>Premium</p>
            <p>Advertise With Us</p>
            <p>Sign Up</p>
          </div>
        </div>
        <div className="content3">
          <div className="content3heading">
            <p>Company</p>
          </div>
          <div className="content2points">
            <p>About Us</p>
            <p>Privacy Policy</p>
            <p>Community Guidelines</p>
            <p>Code of Conduct</p>
            <p>Terms of Services</p>
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
