
import { useNavigate } from 'react-router-dom'; 
import Header from '../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './home.css'
import { useHistory } from 'react-router-dom';
import backgroundImage from '../../assets/images/home-4.jpg';
import TrendingProducts from "../trendingproducts/trending";
import SimpleFooter from '../Footers/SimpleFooters';
import About from '../about/about'
import BASE_URL from '../../config';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // Array to store the search results
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    navigate(`/search-results?keyword=${encodeURIComponent(searchTerm)}`); // Navigate to search results page with the search term
  };

  // // Handle search button click
  // const handleSearch = async (e) => {
  //   e.preventDefault(); // Prevent form submission from reloading the page
  //   try {
  //     const response = await fetch('http://ec2-3-225-106-91.compute-1.amazonaws.com:8080/api/searchProducts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ keyword: searchTerm }), // Send the search keyword
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setProducts(data); // Store the API response in the products array
  //       setSearchActive(true); // Mark search as active
  //     } else {
  //       console.error('Error fetching the products:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <>
      <Header />
     
      <section className="home" id="home" style={{ background: `url(${backgroundImage}) no-repeat`, backgroundSize: 'cover', height: '500px', width: '100%', marginTop: '70px' }}>
        <div className="content">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for fashion..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </form>

          <h3>TEEN FASHION</h3>
          <p>The Fashion Glossary | A-Z Industry Words</p>
          <a href="#" className="btn">
            <span className="text text-1">SHOP NOW</span>
            <span className="text text-2" aria-hidden="true">SHOP MORE</span>
          </a>
        </div>
      </section>

     
       
          <TrendingProducts />
          <TrendingProducts />
          <TrendingProducts />
          <About/>
         
       
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>


      <SimpleFooter />
    </>
  );
};

export default Homepage;
