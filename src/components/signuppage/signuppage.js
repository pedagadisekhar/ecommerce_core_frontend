import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';  // Import the new CSS file
import Header from '../header/header';
import SimpleFooter from '../Footers/SimpleFooters';
import BASE_URL from '../../config';
import backgroundImage from '../../assets/images/logo-1.jpg';

const OtpSignup = () => {
    const [signupData, setSignupData] = useState({
        email: '',
        mobileNo: '',
        Password: ''
    });
    const [otpData, setOtpData] = useState({
        mobileNo: '',
        otp: ''
    });
    const [step, setStep] = useState(1); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };

    const handleOtpChange = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/otpsignup`, signupData);
            console.log(response.data);
            setStep(2);
        } catch (error) {
            setErrorMessage('Signup failed, please try again.');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/verifyOtp`, otpData);
            console.log(response.data);
            setErrorMessage('OTP verified successfully!');
        } catch (error) {
            setErrorMessage('OTP verification failed, please try again.');
        }
    };

    return (
        <>
        <Header/>
        <div className="container">
            <div className="form-container"
             style={{ 
                backgroundImage: `url(${backgroundImage})`, // Use the imported image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh' // Ensures it covers the full height
              }}
            >
                {errorMessage && <p className="error">{errorMessage}</p>}

                {step === 1 ? (
                    <form onSubmit={handleSignupSubmit}>
                        <h2 className="title">Signup Form</h2>
                        <input
                            type="text"
                            name="UserName"
                            placeholder="Username"
                            value={signupData.UserName}
                            onChange={handleSignupChange}
                            className="input"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="mobileNo"
                            placeholder="Mobile Number"
                            value={signupData.mobileNo}
                            onChange={handleSignupChange}
                            className="input"
                            required
                        />
                        <input
                            type="password"
                            name="Password"
                            placeholder="Password"
                            value={signupData.Password}
                            onChange={handleSignupChange}
                            className="input"
                            required
                        />
                        <button type="submit" className="button">Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <h2 className="title">OTP Verification</h2>
                        <input
                            type="text"
                            name="mobileNo"
                            placeholder="Mobile Number"
                            value={otpData.mobileNo}
                            onChange={handleOtpChange}
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="otp"
                            placeholder="OTP"
                            value={otpData.otp}
                            onChange={handleOtpChange}
                            className="input"
                            required
                        />
                        <button type="submit" className="button">Verify OTP</button>
                    </form>
                )}
            </div>
        </div>
        </>
    );
};

export default OtpSignup;
