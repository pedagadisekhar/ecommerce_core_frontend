
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config';
import backgroundImage from '../../assets/images/home-4.jpg';
import { ToastContainer, toast } from 'react-toastify';
import SimpleFooter from '../Footers/SimpleFooters';
import Header from '../header/header';

import 'react-toastify/dist/ReactToastify.css';


function Signin() {
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const email = formdata.get("email")
        const Password = formdata.get("password")
        console.log(email)
        // axios.post('http://ec2-3-225-106-91.compute-1.amazonaws.com:8080/api/signin', {
          axios.post(`${BASE_URL}/api/signin`, {
            email: email,
            Password: Password
            
        }).then((res) => {
            console.log(res);
            if (res.data.message === "Success") {
                 window.localStorage.setItem("token", res.data.token)
                window.localStorage.setItem("UserId", res.data.UserId)
              //  alert("signin Sucessull!")
                //  toast.success("signin Sucessull!");
              
                toast.success("Signin successful!", {
                  position: "top-right",    // You can set other positions like "bottom-left", etc.
                  autoClose: 10000,          // Toast will auto-close after 5 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });


                console.log(email);
                navigate("/homePage");

            }
            if (res.data.message === "please add all fields") {
                alert("User not Registered !")
            }
            if (res.data.message === "please enter valid info") {
                alert("Invalid Crediential!")
            }


        })
            .catch(err => {
                console.log(err)
                alert("entervaliddetails")
            })

    }
    return (
        <>
        <div 
      className="signin-container"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh' // Ensures it covers the full height
      }}
    >
      <div className="signin-box">
        <h2>Sign In</h2>
        <form className='signin-form' onSubmit={handleOnSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="signin-button">Sign In</button>
          <ToastContainer />
        </form>

        {/* Forgot Password link */}
        <p className="forgot-password-link">
          <Link to="/forget">Forgot Password?</Link>
        </p>

        <p className="signup-link">
          <Link to="/signup">Create an account.?</Link>
        </p>
      </div>
    </div>
    

    <ToastContainer />
      </>
    )


}

export default Signin