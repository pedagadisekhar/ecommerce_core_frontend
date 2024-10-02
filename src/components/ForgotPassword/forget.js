import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../config'; // Your base URL configuration
import './forget.css'; // Optional: Add some custom styling

const ForgotPassword = () => {
    const [mobileNo, setmobileNo] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/api/forgot-password`, { mobileNo })
            .then((res) => {
                if (res.data.message === "Success") {
                    toast.success("Password reset instructions sent to your email.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (res.data.message === "User not found") {
                    toast.error("Email not registered!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form className="forgot-password-form" onSubmit={handleOnSubmit}>
                <input
                    type="email"
                    name="email"
                    value={mobileNo}
                    onChange={(e) => setmobileNo(e.target.value)}
                    placeholder="Forgot Password"
                    required
                />
                <button type="submit" className="forgot-password-button">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
