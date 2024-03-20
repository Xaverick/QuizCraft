import { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <p>Enter your email below to login to your account</p>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Enter your email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='Enter your password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className='auth-link'>
          <Link to="/signup" className="signup">
            Already have an account? Signup
          </Link>
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

        </div>

      </form>

    </div>
    
  );
};

export default Login;