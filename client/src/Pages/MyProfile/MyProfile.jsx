// MyProfile.js
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./MyProfile.scss";

const MyProfile = () => {
  return (
    <main className="app">
      <Topbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h1>My Profile</h1>
          <div className="profile-form">
            <div className="profile-photo">
              <img src="" alt="Profile" />
              <button>Upload Photo</button>

              <form action="">
                <div className="row">
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    required
                  />
                  <Input
                    label="Your name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="row">
                    <Input
                        label="Brief bio"
                        type="textarea"
                        placeholder="Enter your message"
                        required
                    />
                    <div className="row-2">
                        <Input
                            label="Country"
                            placeholder="India"
                            required
                        />
                        <Input
                            label="Occupation"
                            placeholder="Enter your occupation"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <Input
                        label="Phone number"
                        type="tel"
                        placeholder="Enter your phone number"
                    />
                    <Input
                        label="Date of Birth"
                        type="date"
                        placeholder="Enter your birthdate"
                    />
                </div>
                <Input label="Profile Tags" type="text" placeholder="Enter Profile Tags" required={false}/>

                <div className="row">
                    <Input
                        label="Social Link #1"
                        type="url"
                        placeholder="Enter your link"
                    />
                    <Input
                        label="Social Link #2"
                        type="url"
                        placeholder="Enter your link"
                    />
                </div>

                <div className="row">
                    <Input
                        label="Social Link #3"
                        type="url"
                        placeholder="Enter your link"
                    />
                    <Input
                        label="Social Link #4"
                        type="url"
                        placeholder="Enter your link"
                    />
                </div>
              </form>
            </div>
            <form></form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;

const Input = ({ label, type = "text", placeholder, required }) => {
  return (
    <div className="input-wrapper ">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
        ></textarea>
      ) : (
        <input type={type} placeholder={placeholder} required={required} />
      )}
    </div>
  );
};

{
  /*<Input label="Username" placeholder="Enter your username" required />
              <Input label="Your name" placeholder="Enter your full name" required />
              <Input label="Brief bio" type="textarea" placeholder="Enter your message" required />
              <div className=''>
                <Input label="Country" placeholder="India" required />
                <Input label="Occupation" placeholder="Enter your occupation" required />
              </div>
              <Input label="Phone number" type="tel" placeholder="Enter your phone number" />
              <Input label="Date of Birth" type="date" placeholder="Enter your birthdate" />
              <Input label="Profile Tags" placeholder="Enter Profile Tags" />
              <Input label="Social Link #1" type="url" placeholder="Enter your link" />
              <Input label="Social Link #2" type="url" placeholder="Enter your link" />
              <Input label="Social Link #3" type="url" placeholder="Enter your link" />
              <Input label="Social Link #4" type="url" placeholder="Enter your link" />
              <button type="submit">Save</button> */
}
