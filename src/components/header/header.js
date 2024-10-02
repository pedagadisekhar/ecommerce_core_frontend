import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faHeart } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import logo from '../../assets/images/logo-1.jpg';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Mobile check
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Check if screen size is <= 768px
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 20000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);



  const handleCartClick = (e) => {
    const token = localStorage.getItem('token');

    if (!token) {
      e.preventDefault(); // Prevent default behavior of Link
      navigate('/signin'); // Redirect to sign-in page if no token
    }
  };

  return (
    <header className="custom-header">
      <a href="#" className="custom-logo">
        <img src={logo} alt="Logo" className="custom-logo-image" />
        <span className="custom-logo-text">TEEN FASHION</span>
      </a>

      <nav className="custom-navbar">
        {!isMobile && ( // Hide "Home" and "Products" for desktop size
          <>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <a href="#home">Home</a>
            </Link>
            <Link to="/allproduct" style={{ textDecoration: 'none' }}>
              <a href="#about">Products</a>
            </Link>
          </>
        )}
        <a href="#contact">Contact</a>
        {location.pathname !== '/' && location.pathname !== '/landing' && (
          <>
            <Link to='/UploadData' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">Upload Data</a>
            </Link>
            <Link to='/ProductUpload' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">ProductUpload</a>
            </Link>
            <Link to='/cart' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">Cart</a>
            </Link>
          </>
        )}
      </nav>

      <div className="custom-icons">
        <div className="custom-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <Link to='/cart' style={{ textDecoration: 'none' }} onClick={handleCartClick}>
        <div className="custom-icon cart-icon">
          <FontAwesomeIcon icon={faShoppingBag} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
        </Link>
        <Link to='/wishlist' style={{ textDecoration: 'none' }}>

        <div className="custom-icon wishlist-icon">
          <FontAwesomeIcon icon={faHeart} />
          <span className="wishlist-count">{wishlistCount}</span>
        </div>
        </Link>

      </div>

      <div className="custom-sidebar" style={{ width: isOpen ? '250px' : '0' }}>
        <a href="#" className="custom-closebtn" onClick={toggleSidebar}>&times;</a>
        {!isAuthenticated ? (
          <>
            <Link to='/signuppage' onClick={toggleSidebar}>Sign Up</Link>
            <Link to='/signin' onClick={toggleSidebar}>Sign In</Link>
            {isMobile && ( // Show "Home" and "Products" for mobile size in sidebar
              <>
                <Link to='/' style={{ textDecoration: 'none' }} onClick={toggleSidebar}>
                  Home
                </Link>
                <Link to='/allproduct' style={{ textDecoration: 'none' }} onClick={toggleSidebar}>
                  Products
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            {isMobile && (
              <>
                <Link to='/' style={{ textDecoration: 'none' }} onClick={toggleSidebar}>
                  Home
                </Link>
                <Link to='/allproduct' style={{ textDecoration: 'none' }} onClick={toggleSidebar}>
                  Products
                </Link>
              </>
            )}
            <Link to='/myorders' onClick={toggleSidebar}>My Orders</Link>
            <Link to='/' onClick={toggleSidebar}>
              <a href="#" onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                toggleSidebar();
              }}>Sign Out</a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
