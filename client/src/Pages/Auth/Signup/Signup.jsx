
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Signup.scss'
import google from '../../../assets/Authpages/google.png'
// import diagonal from '../../../assets/Authpages/diagonal.png'
import image from '../../../assets/Authpages/Image.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const Signup = () => {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // username: '',
    name: '',
    referralcode : ''
  });


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
        toast.success('Signup successfull', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });

        setFormData({
          email: '',
          password: '',
          // username: '',
          name: '',
          referralcode : ''
        });

        setTimeout(() => {
          Navigate('/login');
        }, 1000);
      }

      else {
        throw new Error('Signup failed');
      }


    }

    catch (error) {
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
            <p className='titlesubheading' style={{fontSize:'medium'}}>Create an account to unlock exclusive features.</p>
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
              <input className='signup-input' type="text" placeholder="Have Referal Code ?" name="referralcode" value={formData.referralcode} onChange={handleChange}  />
              {/* <div className="remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe" required />
                <label htmlFor="rememberMe">I agree with Terms of Use and Privacy Policy</label>
              </div> */}
            </div>
            <button className="cta-btn" type="submit" style={{    background: 'linear-gradient(to right, #08AAA2, #5CD7D1)'}}>Sign Up</button>
            <p className="or"><span></span></p>
            <div className="social-login">
              <button className="google-btn">
                <img alt="Google" src={google} />
                <p className="btn-text">Sign Up with Google</p>
              </button>
            </div>
            <a className="forget-pass" href="#">Forgot password?</a>
            <p className="subtitle">Have an account? <Link to='/login'>Login </Link></p>
          </form>
        </div>
        <div className='loginformphoto'>
          <div className='loginformphotopht'>
            <img src={image} style={{width:'-webkit-fill-available'}}/>
          </div>
          <div className='loginformphotoquote'>
            <p>Lorem ipsum dolor sit amet consectetur. Tincidunt libero sed a penatibus eu mi risus habitant mattis. Volutpat lectus gravida scelerisque et felis dolor odio adipiscing. Volutpat lacus nascetur arcu enim congue pretium purus sed. Enim ullamcorper natoque nisi ut pellentesque.</p>
            <div className='sys'>
              <p className='sys1'>Nathen Hopkins</p>
              <p>Lead Product Designer, Netflix</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup