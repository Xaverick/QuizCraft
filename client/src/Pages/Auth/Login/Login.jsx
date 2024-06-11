// import { useState } from 'react';
// import './Login.scss';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux';
// import { login } from '../../../store/slices/authSlice';



// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const Navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const response = await fetch('http://localhost:4000/user/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password }),
//       credentials: 'include'
//     })

//     if(response.ok){
//       const data = await response.json(); 
//       const { payload, expiresIn } = data; // Assuming the response contains token and expiration
//       localStorage.setItem('user', JSON.stringify(payload));
//       localStorage.setItem('expiresIn', Date.now() + expiresIn); 
//       dispatch(login());
//       toast.success('Login successfull', {
//         position: "top-left",
//         autoClose: 2000,
//         hideProgressBar: true,
//         })
//       setEmail('');
//       setPassword('');    
//       setTimeout(() => {
//         Navigate('/');
//       }, 1000);  

//     }

//     else{
//       toast.error('Login failed', {
//         position: "top-left",
//         autoClose: 2000,
//         hideProgressBar: true,
//       })
//     }

//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>
//         <p>Enter your email below to login to your account</p>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder='Enter your email'
//             value={email}
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
//             value={password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//         <div className='auth-link'>
//           <Link to="/signup" className="signup">
//             Already have an account? Signup
//           </Link>
//           <a href="#" className="forgot-password">
//             Forgot your password?
//           </a>

//         </div>


//       </form>

//       <ToastContainer />

//     </div>

//   );
// };

// export default Login;
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../store/slices/authSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Login.scss'
import google from '../../../assets/Authpages/google.png'
// import diagonal from '../../../assets/Authpages/diagonal.png'
import image from '../../../assets/Authpages/Image.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const Login = () => {
  // connect with backend
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/user/login', { email, password });
      if (response.status === 200) {
        const { payload, expiresIn } = response.data;
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('expiresIn', new Date(Date.now() + expiresIn));
        dispatch(login());
        toast.success('Login successfull', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        })
        setEmail('');
        setPassword('');
        setTimeout(() => {
          Navigate('/');
        }, 1000);
      }
      else {
        throw new Error('Login failed');
      }

    } catch (error) {
      toast.error('Login failed', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      })
    }



    // const response = await fetch('http://localhost:4000/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email, password }),
    //   credentials: 'include'
    // })

    // if (response) {
    //   const data = await response.json();
    //   const { payload, expiresIn } = data; // Assuming the response contains token and expiration
    //   localStorage.setItem('user', JSON.stringify(payload));
    //   localStorage.setItem('expiresIn', Date.now() + expiresIn);
    //   dispatch(login());
    //   toast.success('Login successfull', {
    //     position: "top-left",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //   })
    //   setEmail('');
    //   setPassword('');
    //   setTimeout(() => {
    //     Navigate('/');
    //   }, 1000);

    // }

    // else {
    //   toast.error('Login failed', {
    //     position: "top-left",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //   })
    // }
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
            <p className="title">Login</p>
            <p className='titlesubheading'>Welcome back! Please log in to access your account.</p>
            <div className="email-login">
              <label htmlFor="email"><b></b></label>
              <input type="email" placeholder="Enter Your Email" name="email" value={email} onChange={handleChange} required />
              <label htmlFor="password"><b></b></label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
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
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            </div>
            <button className="cta-btn" type="submit">Login</button>
            <p className="or"><span></span></p>
            <div className="social-login">
              <button className="google-btn">
                <img alt="Google" src={google} />
                <p className="btn-text">Login with Google</p>
              </button>
            </div>
            <Link to='/forgotpassword' className="forget-pass">Forgot password?</Link>
            <p className="subtitle">Don't have an account? <Link to='/signup'>Sign Up </Link></p>
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
    </div>
  )
}

export default Login