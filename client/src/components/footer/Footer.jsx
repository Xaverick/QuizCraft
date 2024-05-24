import React from 'react'
import logo from '../../assets/homepageimages/navbarlogo.png'
import insta from '../../assets/Footerimages/insta.png'
import twiter from '../../assets/Footerimages/twiiter.png'
import facebook from '../../assets/Footerimages/facebook.png'
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
                        <p>Crafted with care. Expert-designed quizzes tp test your knowledge and spark curiosity. Stay tuned for more !</p>
                    </div>
                    <div className='contnet1links'>
                        <a href=''><img src={insta} alt='' /></a>
                        <a href=''><img src={facebook} alt='' /></a>
                        <a href=''><img src={twiter} alt='' /></a>
                    </div>
                </div>
                <div className='content2'></div>
                <div className='content3'> </div>
            </div>

        </div>
    )
}

export default Footer