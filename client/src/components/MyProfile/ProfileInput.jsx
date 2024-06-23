// ProfileInput.js
import React from "react";
import "./ProfileInput.scss"

const ProfileInput = () => {
  return (
    <div className="profile-input">
      <h2>Edit Profile</h2>
      <form>
        <div className="row-1">
          <div className="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label for="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="form-group">
          <label for="bio">Brief Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div className="form-group">
          <label for="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter your country"
          />
        </div>
        <div className="form-group">
          <label for="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="Enter your occupation"
          />
        </div>
        <div className="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label for="birthdate">Date of Birth</label>
          <input type="date" id="birthdate" name="birthdate" />
        </div>
        <div className="form-group">
          <label for="tags">Profile Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter Profile Tags"
          />
        </div>
        <div className="form-group">
          <h3>Social Links</h3>
          <div className="social-link">
            <label for="socialLink1">Social Link #1</label>
            <input
              type="text"
              id="socialLink1"
              name="socialLink1"
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label for="socialLink2">Social Link #2</label>
            <input
              type="text"
              id="socialLink2"
              name="socialLink2"
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label for="socialLink3">Social Link #3</label>
            <input
              type="text"
              id="socialLink3"
              name="socialLink3"
              placeholder="Enter your link"
            />
          </div>
          <div className="social-link">
            <label for="socialLink4">Social Link #4</label>
            <input
              type="text"
              id="socialLink4"
              name="socialLink4"
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
