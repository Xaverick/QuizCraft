// // ProfileInput.js
// import React from "react";
// import "./ProfileInput.scss"

// const ProfileInput = () => {
//   return (
//     <div className="profile-input">
//       <h2>Edit Profile</h2>
//       <form>
//         <div className="row-1">
//           <div className="form-group">
//             <label for="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="form-group">
//             <label for="name">Your Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your full name"
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label for="bio">Brief Bio</label>
//           <textarea
//             id="bio"
//             name="bio"
//             placeholder="Enter your message"
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label for="country">Country</label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             placeholder="Enter your country"
//           />
//         </div>
//         <div className="form-group">
//           <label for="occupation">Occupation</label>
//           <input
//             type="text"
//             id="occupation"
//             name="occupation"
//             placeholder="Enter your occupation"
//           />
//         </div>
//         <div className="form-group">
//           <label for="phone">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             placeholder="Enter your phone number"
//           />
//         </div>
//         <div className="form-group">
//           <label for="birthdate">Date of Birth</label>
//           <input type="date" id="birthdate" name="birthdate" />
//         </div>
//         <div className="form-group">
//           <label for="tags">Profile Tags</label>
//           <input
//             type="text"
//             id="tags"
//             name="tags"
//             placeholder="Enter Profile Tags"
//           />
//         </div>
//         <div className="form-group">
//           <h3>Social Links</h3>
//           <div className="social-link">
//             <label for="socialLink1">Social Link #1</label>
//             <input
//               type="text"
//               id="socialLink1"
//               name="socialLink1"
//               placeholder="Enter your link"
//             />
//           </div>
//           <div className="social-link">
//             <label for="socialLink2">Social Link #2</label>
//             <input
//               type="text"
//               id="socialLink2"
//               name="socialLink2"
//               placeholder="Enter your link"
//             />
//           </div>
//           <div className="social-link">
//             <label for="socialLink3">Social Link #3</label>
//             <input
//               type="text"
//               id="socialLink3"
//               name="socialLink3"
//               placeholder="Enter your link"
//             />
//           </div>
//           <div className="social-link">
//             <label for="socialLink4">Social Link #4</label>
//             <input
//               type="text"
//               id="socialLink4"
//               name="socialLink4"
//               placeholder="Enter your link"
//             />
//           </div>
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileInput;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileInput.scss";

const ProfileInput = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    bio: "",
    country: "",
    occupation: "",
    phone: "",
    birthdate: "",
    tags: "",
    socialLink1: "",
    socialLink2: "",
    socialLink3: "",
    socialLink4: ""
  });

  useEffect(() => {
    // Fetch user data from the backend
    console.log("Fetching user data...");
    axios.get('/user/profile') 
      .then(response => {

        console.log("User data fetched successfully", response);
        setProfileData(response);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated profile data to the backend
    axios.post('/api/user/profile', profileData) // Update the URL to match your backend endpoint
      .then(response => {
        console.log("Profile updated successfully", response.data);
      })
      .catch(error => {
        console.error("There was an error updating the profile!", error);
      });
  };

  return (
    <div className="profile-input">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="row-1">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Brief Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={profileData.country}
            onChange={handleChange}
            placeholder="Enter your country"
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={profileData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Date of Birth</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={profileData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Profile Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={profileData.tags}
            onChange={handleChange}
            placeholder="Enter Profile Tags"
          />
        </div>
        <div className="form-group">
          <h3>Social Links</h3>
          <div className="social-link">
            <label htmlFor="socialLink1">Social Link #1</label>
            <input
              type="text"
              id="socialLink1"
              name="socialLink1"
              value={profileData.socialLink1}
              onChange={handleChange}
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label htmlFor="socialLink2">Social Link #2</label>
            <input
              type="text"
              id="socialLink2"
              name="socialLink2"
              value={profileData.socialLink2}
              onChange={handleChange}
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label htmlFor="socialLink3">Social Link #3</label>
            <input
              type="text"
              id="socialLink3"
              name="socialLink3"
              value={profileData.socialLink3}
              onChange={handleChange}
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label htmlFor="socialLink4">Social Link #4</label>
            <input
              type="text"
              id="socialLink4"
              name="socialLink4"
              value={profileData.socialLink4}
              onChange={handleChange}
              placeholder="Enter your link"
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileInput;
