import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Signup.scss';
import google from '../../../assets/Authpages/google.png';
import image from '../../../assets/Authpages/Image.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import AuthSide from '../../../components/authSide/AuthSide';

const Signup = () => {
  const navigate = useNavigate();
  const ref = useSearchParams()[0].get('ref');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    referralcode: ref
  });

  // const [showReferralCodeInput, setShowReferralCodeInput] = useState(false);
  const googleAuth = () => {

    const link = import.meta.env.DEV ? import.meta.env.VITE_LOCALHOST : import.meta.env.VITE_SERVER_URL

    window.open(
      `${link}/auth/google/callback`,
      "_self"
    );
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/user/register', formData);

      if (response.status === 200) {
        toast.success('Signup successful', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });

        setFormData({
          email: '',
          password: '',
          name: '',
          referralcode: ''
        });

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      toast.error('Signup failed', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='lginformcontainer'>
      <div className='loginfrom'>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Sign Up</h1>
            <p className='titlesubheading' style={{ fontSize: 'medium' }}>Create an account to unlock exclusive features.</p>
            <div className="email-login">
              <label htmlFor="text"><b></b></label>
              <input className='signup-input' type="text" placeholder="Enter your full name" name="name" value={formData.name} onChange={handleChange} required />
              <label htmlFor="email"><b></b></label>
              <input className='signup-input' type="email" placeholder="Enter your email address" name="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="psw"><b></b></label>
              <div className="password-input-container">
                <input
                  className='signup-input'
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordVisible ? (
                  <AiOutlineEye
                    className="toggle-password-visibility"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="toggle-password-visibility"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="referral-section">
                <label>Have a referral code?</label>
                {/* {!showReferralCodeInput && (
                  <span className='referral-text' onClick={() => setShowReferralCodeInput(true)}>Add</span>
                )} */}
                {/* {showReferralCodeInput && (
                  <> */}
                <input className='signup-input' type="text" placeholder="Enter Referral Code" name="referralcode" value={formData.referralcode} onChange={handleChange} />
                    {/* <span className='referral-text' onClick={() => setShowReferralCodeInput(false)}>Cancel</span> */}
                  {/* </>
                )} */}
              </div>
            </div>
            <button className="cta-btn" type="submit" style={{ background: 'linear-gradient(to right, #08AAA2, #5CD7D1)' }}>Sign Up</button>
            <p className="or"><span></span></p>
            <p className="subtitle">Have an account? <Link to='/login'>Login</Link></p>
          </form>
          <div className="social-login">
              <button className="google-btn" onClick={googleAuth}>
                <img alt="Google" src={google} />
                <p className="btn-text">Sign Up with Google</p>
              </button>
          </div>
        </div>
        <div className='loginformphoto'> 
          <AuthSide />
        </div>
      </div>
    </div>
  );
}

export default Signup;
