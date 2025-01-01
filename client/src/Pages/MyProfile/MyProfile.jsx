import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { Link } from "react-router-dom";

//components
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


//css
import "./MyProfile.scss";
import styles from "./AvatarGrid.module.css";

//avatar
import { AVATAR } from "./Avatar";

//images
import dashboard from "../../assets/bottombar/dashboard.svg";
import history from "../../assets/bottombar/history.svg";
import setting from "../../assets/bottombar/settings2.svg";
import leaderboard from "../../assets/bottombar/leaderboard0.svg";


const MyProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
  );
  const [filename, setFilename] = useState("No file selected");


  const [formData, setFormData] = useState({
    username: "",
    name: "",
    bio: "",
    country: "",
    occupation: "",
    phoneNo: "",
    dob: "",
    tags: [],
    socialLinks: ["", "", "", ""],
  });

  useEffect(() => {
    axios
      .get("/user/profile")
      .then((response) => {
        response.data.dob
          ? (response.data.dob = new Date(response.data.dob)
            .toISOString()
            .slice(0, 10))
          : (response.data.dob = "");
        setFormData({
          username: response.data.username,
          name: response.data.name,
          bio: response.data.bio,
          country: response.data.country,
          occupation: response.data.occupation,
          phoneNo: response.data.phoneNo,
          dob: response.data.dob,
          tags: response.data.professions,
          socialLinks: response.data.platformLink,
        });
        if (response.data.profilePhoto) {
          setPreview(response.data.profilePhoto);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (newTags) => {
    setFormData({
      ...formData,
      tags: newTags,
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

  const handleAvatarChange = (url) => {
    if (url) {
      setPhoto(url);
      setPreview(url);
    }
  };

  const handleChangelinks = (e, index) => {
    const { value } = e.target;
    const updatedSocialLinks = [...formData.socialLinks];
    updatedSocialLinks[index] = value;
    setFormData({
      ...formData,
      socialLinks: updatedSocialLinks,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDatatosend = new FormData();
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
      console.log(formData);
      const response = await axios.post("/user/updateprofile", formDatatosend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (response.status === 200) {
        console.log("Profile updated successfully");
        toast.success("Profile updated successfully", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });

      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Profile update failed", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
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
              <div className="image-container">
                <div className="image-preview">
                  <img src={preview} alt="Profile" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="file-input"
                  id="upload-photo"
                />
              </div>

              {/* Avatar section */}
              <div className={styles.avatarContainer}>
                {Object.values(AVATAR).map((url, index) => (
                  <div
                    key={index}
                    className={`${styles.avatar} ${preview === url ? styles.selected : ''}`}
                  >
                    <img
                      src={url}
                      alt="Avatar"
                      onClick={() => handleAvatarChange(url)}
                    />
                  </div>
                ))}
                <div 
                  className={styles.add}
                  onClick={() => document.getElementById("upload-photo").click()}
                >+</div>
              </div>

            </div>


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
                  className='bioProfile'
                  style={{ height: '-webkit-fill-available' }}
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
                      //new 
                      "Andorra",
                      "United Arab Emirates",
                      "Afghanistan",
                      "Antigua And Barbuda",
                      "Anguilla",
                      "Albania",
                      "Armenia",
                      "Angola",
                      "Antarctica",
                      "Argentina",
                      "American Samoa",
                      "Austria",
                      "Aruba",
                      "Åland Islands",
                      "Azerbaijan",
                      "Bosnia And Herzegovina",
                      "Barbados",
                      "Bangladesh",
                      "Belgium",
                      "Burkina Faso",
                      "Bulgaria",
                      "Bahrain",
                      "Burundi",
                      "Benin",
                      "Saint Barthélemy",
                      "Bermuda",
                      "Brunei",
                      "Bolivia",
                      "Caribbean Netherlands",
                      "Brazil",
                      "Bahamas",
                      "Bhutan",
                      "Bouvet Island",
                      "Botswana",
                      "Belarus",
                      "Belize",
                      "Cocos (Keeling) Islands",
                      "DR Congo",
                      "Central African Republic",
                      "Republic Of The Congo",
                      "Switzerland",
                      "Côte D'Ivoire (Ivory Coast)",
                      "Cook Islands",
                      "Chile",
                      "Cameroon",
                      "China",
                      "Colombia",
                      "Costa Rica",
                      "Cuba",
                      "Cape Verde",
                      "Curaçao",
                      "Christmas Island",
                      "Cyprus",
                      "Czechia",
                      "Germany",
                      "Djibouti",
                      "Denmark",
                      "Dominica",
                      "Dominican Republic",
                      "Algeria",
                      "Ecuador",
                      "Estonia",
                      "Western Sahara",
                      "Eritrea",
                      "Spain",
                      "Ethiopia",
                      "European Union",
                      "Finland",
                      "Fiji",
                      "Falkland Islands",
                      "Micronesia",
                      "Faroe Islands",
                      "France",
                      "Gabon",
                      "England",
                      "Northern Ireland",
                      "Scotland",
                      "Wales",
                      "Grenada",
                      "Georgia",
                      "French Guiana",
                      "Guernsey",
                      "Gibraltar",
                      "Greenland",
                      "Gambia",
                      "Guinea",
                      "Guadeloupe",
                      "Equatorial Guinea",
                      "Greece",
                      "South Georgia",
                      "Guatemala",
                      "Guam",
                      "Guinea-Bissau",
                      "Guyana",
                      "Hong Kong",
                      "Heard Island And McDonald Islands",
                      "Honduras",
                      "Croatia",
                      "Haiti",
                      "Hungary",
                      "Indonesia",
                      "Ireland",
                      "Israel",
                      "Isle Of Man",
                      "British Indian Ocean Territory",
                      "Iraq",
                      "Iran",
                      "Iceland",
                      "Italy",
                      "Jersey",
                      "Jamaica",
                      "Jordan",
                      "Japan",
                      "Kenya",
                      "Kyrgyzstan",
                      "Cambodia",
                      "Kiribati",
                      "Comoros",
                      "Saint Kitts And Nevis",
                      "North Korea",
                      "South Korea",
                      "Kuwait",
                      "Cayman Islands",
                      "Kazakhstan",
                      "Laos",
                      "Lebanon",
                      "Saint Lucia",
                      "Liechtenstein",
                      "Sri Lanka",
                      "Liberia",
                      "Lesotho",
                      "Lithuania",
                      "Luxembourg",
                      "Latvia",
                      "Libya",
                      "Morocco",
                      "Monaco",
                      "Moldova",
                      "Montenegro",
                      "Saint Martin",
                      "Madagascar",
                      "Marshall Islands",
                      "North Macedonia",
                      "Mali",
                      "Myanmar",
                      "Mongolia",
                      "Macau",
                      "Northern Mariana Islands",
                      "Martinique",
                      "Mauritania",
                      "Montserrat",
                      "Malta",
                      "Mauritius",
                      "Maldives",
                      "Malawi",
                      "Mexico",
                      "Mozambique",
                      "Namibia",
                      "New Caledonia",
                      "Niger",
                      "Norfolk Island",
                      "Nicaragua",
                      "Netherlands",
                      "Norway",
                      "Nepal",
                      "Nauru",
                      "Niue",
                      "Oman",
                      "Panama",
                      "Peru",
                      "French Polynesia",
                      "Papua New Guinea",
                      "Philippines",
                      "Poland",
                      "Saint Pierre And Miquelon",
                      "Pitcairn Islands",
                      "Puerto Rico",
                      "Palestine",
                      "Portugal",
                      "Palau",
                      "Paraguay",
                      "Qatar",
                      "Réunion",
                      "Romania",
                      "Serbia",
                      "Russia",
                      "Rwanda",
                      "Saudi Arabia",
                      "Solomon Islands",
                      "Seychelles",
                      "Sudan",
                      "Sweden",
                      "Saint Helena, Ascension And Tristan Da Cunha",
                      "Slovenia",
                      "Svalbard And Jan Mayen",
                      "Slovakia",
                      "Sierra Leone",
                      "San Marino",
                      "Senegal",
                      "Somalia",
                      "Suriname",
                      "South Sudan",
                      "São Tomé And Príncipe",
                      "El Salvador",
                      "Sint Maarten",
                      "Syria",
                      "Eswatini (Swaziland)",
                      "Turks And Caicos Islands",
                      "Chad",
                      "French Southern And Antarctic Lands",
                      "Togo",
                      "Thailand",
                      "Tajikistan",
                      "Tokelau",
                      "Timor-Leste",
                      "Turkmenistan",
                      "Tunisia",
                      "Tonga",
                      "Turkey",
                      "Trinidad And Tobago",
                      "Tuvalu",
                      "Taiwan",
                      "Tanzania",
                      "Ukraine",
                      "Uganda",
                      "United States Minor Outlying Islands",
                      "United Nations",
                      "Alaska",
                      "Alabama",
                      "Arkansas",
                      "Arizona",
                      "California",
                      "Colorado",
                      "Connecticut",
                      "Delaware",
                      "Florida",
                      "Hawaii",
                      "Iowa",
                      "Idaho",
                      "Illinois",
                      "Indiana",
                      "Kansas",
                      "Kentucky",
                      "Louisiana",
                      "Massachusetts",
                      "Maryland",
                      "Maine",
                      "Michigan",
                      "Minnesota",
                      "Missouri",
                      "Mississippi",
                      "Montana",
                      "North Carolina",
                      "North Dakota",
                      "Nebraska",
                      "New Hampshire",
                      "New Jersey",
                      "New Mexico",
                      "Nevada",
                      "New York",
                      "Ohio",
                      "Oklahoma",
                      "Oregon",
                      "Pennsylvania",
                      "Rhode Island",
                      "South Carolina",
                      "South Dakota",
                      "Tennessee",
                      "Texas",
                      "Utah",
                      "Virginia",
                      "Vermont",
                      "Washington",
                      "Wisconsin",
                      "West Virginia",
                      "Wyoming",
                      "Uruguay",
                      "Uzbekistan",
                      "Vatican City (Holy See)",
                      "Saint Vincent And The Grenadines",
                      "Venezuela",
                      "British Virgin Islands",
                      "United States Virgin Islands",
                      "Vietnam",
                      "Vanuatu",
                      "Wallis And Futuna",
                      "Samoa",
                      "Kosovo",
                      "Yemen",
                      "Mayotte",
                      "Zambia",
                      "Zimbabwe"
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

              <div>
                <h3 className="profileinputslabel">Profile Tags</h3>
                <em >press enter or comma to add new tag</em>
                <TagsInput
                  separators={['Enter', ',']}
                  value={formData.tags}
                  onChange={handleTagsChange}
                  name="tags"
                  placeHolder="Add Tags"
                />
              </div>

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
                  value={formData.socialLinks[1] || ""}
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
                  value={formData.socialLinks[2] || ""}
                  onChange={(e) => handleChangelinks(e, 2)}
                />
                <Input
                  label="Portfolio"
                  type="url"
                  placeholder="Share your Portfolio link"
                  name="socialLinks"
                  value={formData.socialLinks[3] || ""}
                  onChange={(e) => handleChangelinks(e, 3)}
                />
              </div>

              <button
                className="myprofile-btn"
                type="submit"
              >
                Save
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
      
      <div className="bottom-navbar">
        <Link to="/dashboard">
          <img src={dashboard} alt="" />
          <span>Dashboard</span>
        </Link>

        <Link to="/leaderboard">
          <img src={leaderboard} alt="" />
          <span>Leaderboard</span>
        </Link>

        <Link to="/comingsoon">
          <img src={history} alt="" />
          <span>History</span>
        </Link>
        
        <Link to="/my-profile">
          <img src={setting} alt="" />
          <span>Settings</span>
        </Link>
    </div>
    </main>
  );
};

export default MyProfile;

const Input = ({
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  name,
}) => {
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

const Select = ({ label, required, options, value, onChange, name }) => {
  return (
    <div className="input-wrapper">
      <label className="profileinputslabel">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <select
        className="profileinputs"
        required={required}
        value={value}
        onChange={onChange}
        name={name}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};