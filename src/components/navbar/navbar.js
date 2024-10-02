import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#trending">Trending Products</a></li>
        <li><a href="#sales">Sales</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#footer">Footer</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
