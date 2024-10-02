import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      mobile: mobile,
      newPassword: newPassword,
    };

    try {
      // Send POST request to the API
      const response = await axios.post(`${BASE_URL}/api/forgetpassword`, requestBody);

      // Handle success response
      setResponseMessage('Password reset successful!');
    } catch (error) {
      // Handle error response
      setResponseMessage('Error: ' + error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>

      {/* Show the response message */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ForgetPassword;
