import React, { useState, useEffect } from "react";
import Header from '../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import centerImage from '../../assets/images/center.jpg';
import centerImage1 from '../../assets/images/center-1.jpg';
import backgroundImage from '../../assets/images/home-4.jpg';
import TrendingProducts from "../trendingproducts/trending";
import SimpleFooter from '../Footers/SimpleFooters';
import WhatsAppButton from "../whatsapp/whatsapp";
import SalesAndScrollingText from "../offer/offer";
import About from '../about/about';
import './landing.css';
import BASE_URL from '../../config';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";

// HomePage Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`); // Navigate to search results page with the search term
  };

  return (
    <>
      <Header />
      <section className="home-section" id="home" style={{ background: `url(${backgroundImage}) no-repeat`, backgroundSize: 'cover',  marginTop: '-20px' }}>

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
            
            
          </a>
        </div>
      </section>
      <WhatsAppButton/>
      <TrendingProducts />
       <TrendingProducts />
      <SalesAndScrollingText/>
      <TrendingProducts />
      <About />
      <SimpleFooter />
    </>
  );
};

// SearchResults Component for Displaying Search Results
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract the search term from the URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Example API call to fetch search results
        const response = await fetch(
          `http://localhost:8080/api/search?keyword=${encodeURIComponent(keyword)}`
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Search Results for "{keyword}"</h1>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <p>{result.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// App Component with Routes
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/search-results" element={<SearchResults />} /> {/* Search Results Page */}
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
};

export default  HomePage  ;
