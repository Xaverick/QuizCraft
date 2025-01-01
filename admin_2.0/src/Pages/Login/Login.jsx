import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../slices/userSlice";
import styles from './Login.module.css';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. Received data:', data);

        dispatch(setUser({
          user: data.user,
          token: data.token,
          expiresIn: data.expiresIn,
        }));

        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('expiresIn', JSON.stringify(data.expiresIn));

        alert('Login successful');
        navigate('/');
      } else {
        console.error('Login failed. Status:', response.status);
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h1>Welcome To Geek Clash Admin Panel</h1>
          <p>You Need to Login First</p>
        </div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginFormContainer}>
          <div className={styles.loginInfo}>
            <h3>LOG IN</h3>
            <p>Enter your email and password to sign in</p>
          </div>

          <div className={styles.loginInputContainer}>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name='password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.loginButtonContainer}>
            <button onClick={handleSubmit}>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
