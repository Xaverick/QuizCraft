import React from 'react'
import logo from '../../assets/homepageimages/navbarlogo.png'
import insta from '../../assets/Footerimages/insta.png'
import twiter from '../../assets/Footerimages/twiiter.png'
import facebook from '../../assets/Footerimages/facebook.png'
import linkedlin from '../../assets/Footerimages/linkdelin.png'
import './Footer.scss'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footercontent'>
                <div className='content1'>
                    <div className='content1logo'>
                        <img src={logo} alt='' />
                    </div>
                    <div className='content1content'>
                        <p>Crafted with care. Expert-designed quizzes tp test your
                            <br />knowledge and spark curiosity. Stay tuned for more !</p>
                    </div>
                    <div className='contnet1links'>
                        <a href='https://www.instagram.com/phicsit.in'><img src={insta} alt='' /></a>
                        <a href=''><img src={facebook} alt='' /></a>
                        <a href='https://x.com/phicsit'><img src={twiter} alt='' /></a>
                        {/* <a href='https://x.com/phicsit'><img src={linkedlin} alt='' /></a> */}

                    </div>
                </div>
                <div className='content2'>
                    <div className='content2heading'>
                        <p>Quick Links</p>
                    </div>
                    <div className='content2points'>
                        <p>Contest</p>
                        <p>Leaderboard</p>
                        <p>Premium</p>
                        <p>Advertise With Us</p>
                        <p>Sign Up</p>
                    </div>
                </div>
                <div className='content3'>
                    <div className='content3heading'>
                        <p>About Us</p></div>
                    <div className='content2points'>
                        <p>Privacy Policy</p>
                        <p>Community Guidelines</p>
                        <p>Code of Conduct</p>
                        <p>Terms of Services</p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer