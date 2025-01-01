import React, { useState } from "react";
import styles from "./CreateReward.module.css";
import Navbar from "../../Components/Navbar/Navbar";

const CreateReward = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [rewardName, setRewardName] = useState("");
  const [rewardImage, setRewardImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rewardName", rewardName);
    formData.append("rewardImage", rewardImage);

    try {
      const response = await fetch(`${apiUrl}/reward/create-reward`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Failed to create reward");
      }
    } catch (error) {
      console.error("Failed to create reward:", error);
      setMessage("Failed to create reward");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Create Reward</h2>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="rewardName">Reward Name:</label>
            <input
              type="text"
              id="rewardName"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rewardImage">Reward Image:</label>
            <input
              type="file"
              id="rewardImage"
              accept="image/*"
              onChange={(e) => setRewardImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Create Reward
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default CreateReward;
