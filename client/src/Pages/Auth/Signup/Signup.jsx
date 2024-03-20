import { useState } from 'react';
import './Signup.scss';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', username);
    console.log('Name:', name);
    setEmail('');
    setPassword('');
    setUsername('');
    setName('');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SignUp With Us !</h2>
        <p>Fill in the details below to create an account</p>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder='Enter your username'
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Enter your name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
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
        
        <button type="submit">Signup</button>
        <div className='auth-link'>
          <Link to="/login" className="login">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
