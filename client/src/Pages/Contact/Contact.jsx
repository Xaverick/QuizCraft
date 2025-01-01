import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

//styles
import styles from './Contact.module.css'

//comoonents
import Comment from '../../components/comment/Comment.jsx';
import commentdata from '../../assets/data/commentdata.js';

//icons
import WEB from "./assets/Web.svg"
import send from '../../assets/Contactpage/send.svg';
import contactimage from '../../assets/Contactpage/Contactimage.svg'
import tick from '../../assets/Contactpage/tick.svg'
import rightside from '../../assets/Contactpage/rightside.svg'



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
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftside}>
          <div className={styles.topContainer}>
            <div className={styles.icon}>
              <img src={WEB} alt="web" />
            </div>
            <h1 className={styles.title}>Connect with Us Today!</h1>
            <p className={styles.subtitle}>
              Have a question or interested in partnering with Geek Clash? 
              Reach out to us for any queries, partnership opportunities, or collaboration ideas. 
              We're here to help and excited to connect with you!
            </p>
          </div>

          <div className={styles.middleContainer}>
            <div className={styles.heading}>
              Our Commitment to You
            </div>

            <div className={styles.commitments}>
              <div className={styles.commitmentText}>
                <img src={tick} alt="tick" />
                <p>Swift responses, dedicated support</p>
              </div>

              <div className={styles.commitmentText}>
                <img src={tick} alt="tick" />
                <p>Efficient and always here for you</p>
              </div>

              <div className={styles.commitmentText}>
                <img src={tick} alt="tick" />
                <p>We listen, understand, and act promptly</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightside}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formPart}>
                <div className={styles.inputContainer}>

                  <label className={styles.label}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formdata.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formdata.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className={styles.input}
                    required
                  />
                </div>

              </div>

              <div className={styles.formPart}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formdata.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className={styles.input}
                    required
                  />
                </div>

              </div>

              <div className={styles.formPart}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formdata.subject}
                    onChange={handleChange}
                    placeholder="Enter Subject"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formPart}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    name="message"
                    value={formdata.message}
                    onChange={handleChange}
                    placeholder="Enter Your Message here..."
                    className={styles.textarea}
                    required
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>
                  <img src={send} alt="send" />
                  Send Your Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.leftside}>
          <div className={styles.bottomContainer}>
            <div className={styles.info}>
              <p className={styles.text}>You can email us here</p>
              <p className={styles.email}>support@phicsit.in</p>
            </div>

            <div className={styles.rightIcon}>
              <img src={rightside} alt="rightside"/>
            </div>

          </div>
        </div>

        <div className={styles.rightside}>
          <div className={styles.bottomContainer}>
            <div className={styles.info}>
              <p className={styles.text}>Office Hours</p>
              <p className={styles.email}>09:00 am - 06:00 pm</p>
            </div>

            <div className={styles.rightIcon}>
              <img src={rightside} alt="rightside" />
            </div>

          </div>
        </div>
      </div>

      <div className={styles.commentContainer}>
        <div className={`${styles.commentSlider} ${styles.firstRow}`}>
          {commentdata.concat(commentdata).map((comment, index) => (
            <Comment key={index} ca={comment} />
          ))}
        </div>

        <div className={`${styles.commentSlider} ${styles.secondRow}`}>
          {commentdata.concat(commentdata).map((comment, index) => (
            <Comment key={index} ca={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact