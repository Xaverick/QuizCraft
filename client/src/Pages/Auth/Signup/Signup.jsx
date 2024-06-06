// import { useState } from 'react';
// import './Signup.scss';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Signup = () => {
//   const Navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     username: '',
//     name: ''
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const response = await fetch('http://localhost:4000/user/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })

//     if(response.ok){

//       toast.success('Signup successfull', {
//         position: "top-left",
//         autoClose: 2000,
//         hideProgressBar: true,
//       });

//       setFormData({
//         email: '',
//         password: '',
//         username: '',
//         name: ''
//       });

//       setTimeout(() => {
//         Navigate('/login');
//       }, 1000);

//     }

//     else{
//       toast.error('Signup failed', {
//         position: "top-left",
//         autoClose: 2000,
//         hideProgressBar: true,
//       });
//     } 


//   };

//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSubmit} className="signup-form">
//         <h2>SignUp With Us !</h2>
//         <p>Fill in the details below to create an account</p>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             placeholder='Enter your username'
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             placeholder='Enter your name'
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder='Enter your email'
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder='Enter your password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Signup</button>
//         <div className='auth-link'>
//           <Link to="/login" className="login">
//             Already have an account? Login
//           </Link>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Signup.scss'
import google from '../../../assets/Authpages/google.png'
import diagonal from '../../../assets/Authpages/diagonal.png'
import image from '../../../assets/Authpages/Image.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const Signup = () => {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // username: '',
    name: ''
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


    try{
      const response = await axios.post('/user/register', formData);

      if(response.status === 200){
        toast.success('Signup successfull', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
  
        setFormData({
          email: '',
          password: '',
          // username: '',
          name: ''
        });
  
        setTimeout(() => {
          Navigate('/login');
        }, 1000);
      }

      else{
        throw new Error('Signup failed');
      }

      
    }

    catch(error){
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
            <p className="title">Sign Up</p>
            <p className='titlesubheading'>Create an account to unlock exclusive features.</p>
            <div className="email-login">
              <label htmlFor="text"><b></b></label>
              <input type="text" placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange} required />
              <label htmlFor="email"><b></b></label>
              <input type="email" placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="psw"><b></b></label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Your Password"
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
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe" required />
                <label htmlFor="rememberMe">I agree with Terms of Use and Privacy Policy</label>
              </div>
            </div>
            <button className="cta-btn" type="submit">Sign Up</button>
            <p className="or"><span></span></p>
            <div className="social-login">
              <button className="google-btn">
                <img alt="Google" src={google} />
                <p className="btn-text">Login with Google</p>
              </button>
            </div>
            <a className="forget-pass" href="#">Forgot password?</a>
            <p className="subtitle">Don't have an account? <Link to='/login'></Link>Login <img src={diagonal} /></p>
          </form>
        </div>
        <div className='loginformphoto'>
          <div className='loginformphotopht'>
            <img src={image} />
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

    </div >
  )
}

export default Signup