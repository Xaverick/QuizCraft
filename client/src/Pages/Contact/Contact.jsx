import React from 'react'
import './Contact.scss'
import contactimage from '../../assets/Contactpage/contactimage.png'
import tick from '../../assets/Contactpage/tick.png'
import Comment from '../../components/comment/Comment.jsx';
import commentdata from '../../assets/data/commentdata.js';
import rightside from '../../assets/Contactpage/rightside.png'
const Contact = () => {
    return (
        <>
            <div className='contact'>
                <div className='contactcontent'>
                    <div className='contactmain'>
                        <div className='contactmainimage'>
                            <img src={contactimage} />
                        </div>
                        <div className='contactmainheading1'>Connect with Us Today!</div>
                        <div className='contactmainheading2'>At Apex, we value your inquiries, feedback, and collaborations. Whether you are interested in our digital services, have questions about our project</div>
                        <div className='contactmainbox'>
                            <div className='contactmainboxheading'>Our Commitment to You</div>
                            <div className='contactmainboxpoints'>
                                <div className='contactmainboxpoint'>
                                    <span><img src={tick} /></span>
                                    <p>Swift responses, dedicated support</p>
                                </div>
                                <div className='contactmainboxpoint'>
                                    <span><img src={tick} /></span>
                                    <p>Efficient and always here for you</p>
                                </div>
                                <div className='contactmainboxpoint'>
                                    <span><img src={tick} /></span>
                                    <p>We listen, understand, and act promptly</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='box'>
                        <div className="box">
                            <form>
                                <div className="name">
                                    <label htmlFor="name">First Name</label>
                                    <br />
                                    <input type="text" id="name" placeholder='Enter first Name' required />
                                </div>
                                <div className="company">
                                    <label htmlFor="company">Last Name </label>
                                    <br />
                                    <input type="text" id="company" placeholder='Enter Last Name' required />
                                </div>
                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email" id="email" placeholder='Enter your Email' required />
                                </div>
                                <div className="tele">
                                    <label htmlFor="telephone">Phone </label>
                                    <br />
                                    <input type="tel" id="telephone" placeholder='Enter Phone Number' required />
                                </div>
                                <div className="message">
                                    <label htmlFor="subject">Subject</label>
                                    <br />
                                    <textarea id="message" placeholder='Enter your Subject'></textarea>
                                </div>
                                <div className="message">
                                    <label htmlFor="message">Message</label>
                                    <br />
                                    <textarea id="message" placeholder='Enter your Message'></textarea>
                                </div>
                                <div className="submit">
                                    <input type="submit" value="Send Your Message" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactbtt'>
                <div className='contactbtt1'>
                    <div className='stylebtt'>
                        <p>You can email us here</p>
                        <p className='stylep'>support@phicsit.in</p>
                    </div>
                    <div className='stylebtt'>
                        <img src={rightside} />
                    </div>
                </div>
                <div className='contactbtt2'>
                    <div className='stylebtt'>
                        <p>Office Hours</p>
                        <p className='stylep'>9:00 am - 6:00 pm</p>
                    </div>
                    <div className='stylebtt'>
                        <img src={rightside} />
                    </div>
                </div>
            </div>
            <div className='contactphase2'>
                <div className='homephase7comments'>
                    <div className="comment-slider first-row">
                        {commentdata.concat(commentdata).map((c, index) => (
                            <Comment key={index} ca={c} />
                        ))}
                    </div>
                    <div className="comment-slider second-row">
                        {commentdata.concat(commentdata).map((c, index) => (
                            <Comment key={index} ca={c} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact