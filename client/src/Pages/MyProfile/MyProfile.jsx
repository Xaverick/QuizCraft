// MyProfile.js
import React,{useState} from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import "./MyProfile.scss";

const MyProfile = () => {
  const [tags, setTags] = useState([]);

  const handleChange = (newTags) => {
    setTags(newTags);
    console.log(tags)
  };

  return (
    <main className="app">
      <Topbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h1>My Profile</h1>
          <div className="profile-form">
            <div className="profile-photo">
              <img src={"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="" />
              <button>Upload Photo</button>

              <form action="">
                <div className="myprofile-row">
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

                <div className="myprofile-row">
                  <Input
                    label="Brief bio"
                    type="textarea"
                    placeholder="Enter your message"
                    required
                  />
                  <div className="myprofile-row-2">
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

                <div className="myprofile-row">
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
                {/* <Input label="Profile Tags" type="text" placeholder="Enter Profile Tags" required={false} /> */}
                <TagsInput value={tags} onChange={handleChange} />

                <div className="myprofile-row">
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

                <div className="myprofile-row">
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
            <button className="myprofile-btn" type="submit">Save</button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default MyProfile;

const Input = ({ label, type = "text", placeholder, required }) => {
  return (
    <>
      <div className="input-wrapper ">
        <label className="profileinputslabel">{label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            required={required}
            className="profileinputs"
          ></textarea>
        ) : (
          <input className="profileinputs" type={type} placeholder={placeholder} required={required} />
        )}
      </div>

    </>

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