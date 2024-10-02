import React from 'react';
import './whatsapp.css'; // Import the CSS for styling

const WhatsAppButton = () => {
  const phoneNumber = '8074046422'; // Replace with your phone number
  const message = 'Hello, I would like to get more information!'; // Replace with your message
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button" // Use a CSS class for styling
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // WhatsApp icon URL
        alt="WhatsApp"
        className="whatsapp-icon" // Add class for the icon
      />
    </a>
  );
};

export default WhatsAppButton;
