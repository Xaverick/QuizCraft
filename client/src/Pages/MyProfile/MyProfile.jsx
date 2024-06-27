import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "react-tagsinput/react-tagsinput.css";
import "./MyProfile.scss";

const MyProfile = () => {
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
  );
  const [filename, setFilename] = useState("No file selected");
  const [selected, setSelected] = useState(["papaya"]);

  const handleChange = (newTags) => {
    setTags(newTags);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      setFilename(file.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, including the uploaded photo
    const formData = new FormData();
    formData.append("photo", photo);
    // Append other form data as needed

    // Example: send the form data to the server
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(response => {
    //   console.log(response);
    // });
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
              <img src={preview} alt="Profile" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="file-input"
                style={{ display: "none" }}
                id="upload-photo"
              />
              <p>{filename}</p>
              <button
                onClick={() => document.getElementById("upload-photo").click()}
              >
                Upload Photo
              </button>

              <form onSubmit={handleSubmit}>
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
                    <Select
                      label="Country"
                      required
                      options={[
                        "India",
                        "Australia",
                        "Canada",
                        "Egypt",
                        "Ghana",
                        "Malaysia",
                        "Pakistan",
                        "New Zealand",
                        "Nigeria",
                        "Republic of Ireland",
                        "Singapore",
                        "South Africa",
                        "United States",
                        "United Kingdom",
                      ]}
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
                <>
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="fruits"
                    placeHolder="Add Tags"
                    classNames="tag-input"
                  />
                  <em>press enter or comma to add new tag</em>
                </>
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

                <button className="myprofile-btn" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;

const Input = ({ label, type = "text", placeholder, required }) => {
  return (
    <div className="input-wrapper">
      <label className="profileinputslabel">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          className="profileinputs"
        ></textarea>
      ) : (
        <input
          className="profileinputs"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

const Select = ({ label, required, options }) => {
  return (
    <div className="input-wrapper">
      <label className="profileinputslabel">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <select className="profileinputs" required={required}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
