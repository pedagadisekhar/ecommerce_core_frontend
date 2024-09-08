import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
 
  
  const [userName, setUserName] = useState('');
  const [data, setData] = useState(null);
  const [showSignInSignUp, setShowSignInSignUp] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Update currentPage based on the current location
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let timer;
    if (!showSignInSignUp) {
      timer = setTimeout(() => {
        setShowSignInSignUp(false);
      }, 20000); // Adjust the delay time as needed (200ms in this example)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSignInSignUp]);

  // const handleIconClick = () => {
  //   setShowSignInSignUp(!showSignInSignUp);
  // };

 
  return (
  
  <header className="header">
           <a href="#" className="logo"> <i className="fas fa-book"></i> TEEN FASHION</a>

            <nav className="navbar">
                <a href="#home">home</a>
                <Link to='/allproduct' style={{ textDecoration: 'none' }}>
                <a href="#about">Products</a>
                </Link>
                <a href="#contact" >contact</a>
                {location.pathname === '/' || location.pathname === '/landing' ? null : (
        <>
          <Link to='/UploadData' style={{ textDecoration: 'none' }}>
            <a className="hover-underline">Upload Data</a>
          </Link>
          <Link to='/ProductUpload' style={{ textDecoration: 'none' }}>
            <a className="hover-underline">ProductUpload</a>
          </Link>
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            <a className="hover-underline">cart</a>
          </Link>
        </>
      )}
            </nav>

            

            <div className="icons">
        <div className="icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      <div className="sidebar" style={{ width: isOpen ? '250px' : '0' }}>
        <a href="#" className="closebtn" onClick={toggleSidebar}>&times;</a>
        <Link to='/signuppage' onClick={toggleSidebar}>Sign Up</Link>
        <Link to='/signin' onClick={toggleSidebar}>Sign In</Link>
      </div>
          
        </header>


  );
}

export default Header;
