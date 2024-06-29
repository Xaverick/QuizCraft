import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
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
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    bio: '',
    country: 'India',
    occupation: '',
    phoneNo: '',
    dob: '',
    tags: [],
    socialLinks: ['', '', '', '']  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleTagsChange = (newTags) => {
    setFormData({
      ...formData,
      tags: newTags
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      setFilename(file.name);
    }
  };

  const handleChangelinks = (e, index) => {
    const { name, value } = e.target;
    const updatedSocialLinks = [...formData.socialLinks]; // Create a copy of socialLinks array
    updatedSocialLinks[index] = value; // Update the specific index with the new value
    setFormData({
      ...formData,
      socialLinks: updatedSocialLinks // Update formData with the updated array
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can handle the form submission, including the uploaded photo
    const formDatatosend = new FormData();
    // Append data to FormData
    formDatatosend.append("photo", photo);
    formDatatosend.append("username", formData.username);
    formDatatosend.append("name", formData.name);
    formDatatosend.append("bio", formData.bio);
    formDatatosend.append("country", formData.country);
    formDatatosend.append("occupation", formData.occupation);
    formDatatosend.append("phoneNo", formData.phoneNo);
    formDatatosend.append("dob", formData.dob);
    formData.tags.forEach((tag, index) => {
      formDatatosend.append(`tags[${index}]`, tag);
    });
    formData.socialLinks.forEach((link, index) => {
      formDatatosend.append(`socialLinks[${index}]`, link);
    });
    try {
      console.log(formData)
      const response = await axios.post('/user/updateprofile', formDatatosend);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

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
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    required
                  />
                  <Input
                    label="Your name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    required
                  />
                </div>

                <div className="myprofile-row">
                  <Input
                    label="Brief bio"
                    type="textarea"
                    placeholder="Enter your message"
                    value={formData.bio}
                    onChange={handleChange}
                    name="bio"
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
                      value={formData.country}
                      onChange={handleChange}
                      name="country"
                    />

                    <Input
                      label="Occupation"
                      placeholder="Enter your occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      name="occupation"
                      required
                    />
                  </div>
                </div>

                <div className="myprofile-row">
                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    name="phoneNo"
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    placeholder="Enter your birthdate"
                    value={formData.dob}
                    onChange={handleChange}
                    name="dob"
                  />
                </div>
                <>
                  <h3 className="profileinputslabel">Profile Tags</h3>
                  <TagInput
                    value={formData.tags}
                    onChange={handleTagsChange}
                    name="tags"
                    placeHolder="Add Tags"
                    classNames="tag-input"
                  />
                  <em>press enter or comma to add new tag</em>
                </>
                <h3>Social Links</h3>
                <div className="myprofile-row">
                  <Input
                    label="Instagram"
                    type="url"
                    placeholder="Enter your Instagram link"
                    value={formData.socialLinks[0]}
                    name="socialLinks"
                    onChange={(e) => handleChangelinks(e, 0)} 

                  />
                  <Input
                    label="X (Formerly Twitter)"
                    type="url"
                    placeholder="Enter your Twitter link"
                    value={formData.socialLinks[1]}
                    name="socialLinks"
                    onChange={(e) => handleChangelinks(e, 1)} 
                  />
                </div>

                <div className="myprofile-row">
                  <Input
                    label="LinkedIn"
                    type="url"
                    placeholder="Enter your LinkedIn link"
                    name="socialLinks"
                    value={formData.socialLinks[2]}
                    onChange={(e) => handleChangelinks(e, 2)} 
                  />
                  <Input
                    label="Portfolio"
                    type="url"
                    placeholder="Share your Portfolio link"
                    name="socialLinks"
                    value={formData.socialLinks[3]}
                    onChange={(e) => handleChangelinks(e, 3)}  
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

const TagInput = ({ value, onChange, name, placeHolder, classNames }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagValue = e.target.value.trim();
      if (tagValue) {
        onChange([...value, tagValue]);
      }
      e.target.value = '';
    }
  };

  return (
    <div className={classNames}>
      <input
        type="text"
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {value.map((tag, index) => (
          <li key={index}>
            {tag} <button onClick={() => onChange(value.filter((_, i) => i !== index))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Input = ({ label, type = "text", placeholder, required ,value, onChange, name}) => {
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
          value={value}
          onChange={onChange}
          name={name}
        ></textarea>
      ) : (
        <input
          className="profileinputs"
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </div>
  );
};

const Select = ({ label, required, options , value ,onChange,name }) => {
  return (
    <div className="input-wrapper">
      <label className="profileinputslabel">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <select className="profileinputs" required={required} value={value} onChange={onChange} name={name}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
