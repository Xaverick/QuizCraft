import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//styles
import styles from "./ForgotPassword.module.css";

//components
import AuthSide from "../../../components/authSide/AuthSide";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/user/forgotpassword", { email: email.toLowerCase() });

      if (response.status === 201) {
        setMessage(
          "Check your email for resetting the password and after following the instructions try to login again."
        );
      }
    } catch (error) {
      setError("Error sending email. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2>Forgot Password?</h2>
          <p>No worries, we will send an email with a verification code.</p>
        </div>

        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
            <button type="submit">Send Reset Instructions</button>
          </form>

          <div className={styles.redirect}>
            <Link to="/login">Back to login</Link>
          </div>
        </div>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errMessage}>{error}</p>}
      </div>
      <div className={styles.authSide}>
        <AuthSide />
      </div>
    </div>
  );
};

export default ForgotPassword;
