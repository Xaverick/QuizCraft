import { useState, useEffect } from 'react'
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



  const googleAuth = () => {

    const link = import.meta.env.DEV ? import.meta.env.VITE_LOCALHOST : import.meta.env.VITE_SERVER_URL

    window.open(
      `${link}/auth/google/callback`,
      "_self"
    );
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get('/auth/getDetails',
          {
            withCredentials: true
          }
        );

        const { data, status } = response;
        if (status === 200) {
          const { payload, expiresIn } = data;
          localStorage.setItem('user', JSON.stringify(payload));
          localStorage.setItem('expiresIn', expiresIn);
          dispatch(login());
          // toast.success('Login successful', {
          //   position: "top-left",
          //   autoClose: 2000,
          //   hideProgressBar: true,
          // });
          setEmail('');
          setPassword('');
          setTimeout(() => {
            Navigate('/contest');
          }, 1000);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.log('Error during login:', error);
      }
    }

    getDetails();
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/user/login', { email, password });
      if (response.status === 200) {
        const { payload, expiresIn } = response.data;
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('expiresIn', expiresIn);
        dispatch(login());
        toast.success('Login successful', {
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
            <h1 className="title">Login</h1>

            <p className='titlesubheading' style={{fontSize:'medium'}}>Welcome back! Please log in to access your account.</p>
            <div className="email-login">
              <label htmlFor="email"><b></b></label>
              <input className='login-inputs' type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleChange} required />
              <label htmlFor="password"><b></b></label>
              <div className="password-input-container">
                <input
                  className='login-inputs'
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
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
              {/* <div className="remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe" required />
                <label htmlFor="rememberMe">Remember Me</label>
              </div> */}
            </div>
            <button className="cta-btn" type="submit" style={{    background: 'linear-gradient(to right, #08AAA2, #5CD7D1)'}} >Login</button>

          </form>
          <p className="or"><span></span></p>
          <div className="social-login">
            <button className="google-btn" onClick={googleAuth}>
              <img alt="Google" src={google} />
              <p className="btn-text">Login with Google</p>
            </button>
          </div>
          <Link to='/forgotpassword' className="forget-pass">Forgot password?</Link>
          <p className="subtitle">Don't have an account? <Link to='/signup'>Sign Up </Link></p>
        </div>
        <div className='loginformphoto'>
          <div className='loginformphotopht'>
            <img src={image} style={{width:'-webkit-fill-available'}} />
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