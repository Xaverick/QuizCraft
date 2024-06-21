import React from 'react'
import './Contact.scss'
import contactimage from '../../assets/Contactpage/contactimage.png'
import tick from '../../assets/Contactpage/tick.png'
import Comment from '../../components/comment/Comment.jsx';
import commentdata from '../../assets/data/commentdata.js';
import rightside from '../../assets/Contactpage/rightside.png'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import send from '../../assets/Contactpage/send.svg';

const Contact = () => {
    const [formdata, setFormdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',

    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata({
            ...formdata,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/contact', formdata);

            if (response.status === 200) {
                toast.success("Thank you for contacting us", {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                setFormdata({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    subject: '',
                    message: '',

                })

            }

        }

        catch (error) {
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            })

        }
    }


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
                                    <label htmlFor="firstName">First Name</label>
                                    <br />
                                    <input type="text" name='firstName' value={formdata.firstName} onChange={handleChange} id="firstName" placeholder='Enter first Name' required />
                                </div>
                                <div className="company">
                                    <label htmlFor="lastName">Last Name </label>
                                    <br />
                                    <input type="text" id="lastName" name='lastName' value={formdata.lastName} onChange={handleChange} placeholder='Enter Last Name' required />
                                </div>
                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email" id="email" name='email' value={formdata.email} onChange={handleChange} placeholder='Enter your Email' required />
                                </div>
                                <div className="tele">
                                    <label htmlFor="phoneNumber">Phone </label>
                                    <br />
                                    <input type="tel" id="phoneNumber" name='phoneNumber' value={formdata.phoneNumber} onChange={handleChange} pattern="[0-9]{10}" placeholder='Enter Phone Number' required />
                                </div>
                                <div className="message">
                                    <label htmlFor="subject">Subject</label>
                                    <br />

                                    <textarea
                                        id="subject"
                                        name="subject"
                                        value={formdata.subject}
                                        onChange={handleChange}
                                        placeholder="Enter your Subject"
                                        cols="57"


                                    ></textarea>
                                </div>
                                <div className="message">
                                    <label htmlFor="message">Message</label>
                                    <br />
                                    <textarea id="message" name='message' value={formdata.message} onChange={handleChange} placeholder='Enter your Message'></textarea>
                                </div>
                                <div className="submit">
                                    {/* <input type="submit" value="Send Your Message" onC/>  */}
                                    <button onClick={handleSubmit} type='submit'><span>
                                        <img src={send}></img>
                                    </span>Send Your Message</button>
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