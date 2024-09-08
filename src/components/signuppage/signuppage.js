import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import BASE_URL from '../../config';


const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [UserName, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [PANCard, setPANCard] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (Password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/signup`, {
        email,
        UserName,
        Password,
        mobileNo,
        PANCard,
        address,
        profilePic,
        state,
        district,
        pinCode,
        country,
      });

      if (response.status === 200) {
        alert("User registered successfully");
        navigate('/');
      } else {
        alert("Failed to register user");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("An error occurred during registration");
    }
  };

  return (
    <>
      <section id="header"></section>
      <section id="middel">
        <center>
          <form className="form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Email"
              required
            />
            <br /><br />
            <input
              type="text"
              name="name"
              value={UserName}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Name"
              required
            />
            <br /><br />
            <input
              type="password"
              name="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
              required
            />
            <br /><br />
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="form-input"
              placeholder="Confirm Password"
              required
            />
            <br /><br />
            {Password !== confirmpassword ? <p>Passwords do not match</p> : null}
            <br />
            <input
              type="text"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="form-input"
              placeholder="Mobile No"
              required
            />
            <br /><br />
            <input
              type="text"
              name="PANCard"
              value={PANCard}
              onChange={(e) => setPANCard(e.target.value)}
              className="form-input"
              placeholder="PAN Card"
              required
            />
            <br /><br />
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="Address"
              required
            />
            <br /><br />
            <input
              type="text"
              name="profilePic"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="form-input"
              placeholder="Profile Pic"
            />
            <br /><br />
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-input"
              placeholder="State"
              required
            />
            <br /><br />
            <input
              type="text"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="form-input"
              placeholder="District"
              required
            />
            <br /><br />
            <input
              type="text"
              name="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="form-input"
              placeholder="Pin Code"
              required
            />
            <br /><br />
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input"
              placeholder="Country"
              required
            />
            <br /><br />
            <button className="btn-btn" type="submit">Register</button>
          </form>
        </center>
      </section>
      <section id="bottom-img"></section>
    </>
  );
};

export default Signuppage;
