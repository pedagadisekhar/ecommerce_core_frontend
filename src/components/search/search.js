import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config';
import { FaHeart } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import Header from '../header/header';
import './search.css';


import SimpleFooter from '../Footers/SimpleFooters';



const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [wishList, setWishList] = useState([]);

  const toggleWishList = (productId) => {
    setWishList((prevWishList) =>
      prevWishList.includes(productId)
        ? prevWishList.filter((id) => id !== productId)
        : [...prevWishList, productId]
    );
  };

  // Extract the search term from the URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Make a POST request to the API with the search keyword
        const response = await axios.post(`${BASE_URL}/api/searchProducts`, { keyword });
        setResults(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch search results');
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
    <>
    <Header/>
    <div className="trending-products">
      <h1>Search Results for "{keyword}"</h1>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => (
           <div key={result.ProductId} className="product-card">
         


           <div className="image-container">
           <Link to={`/product/${result.ProductId}`}>
             <img src={`${BASE_URL}/${result.imageUrl}`} alt ={results.ProductName} className='fafa'/>
             </Link>
           </div>
          
           <div className="product-info">
             <h3 className="product-name">{result.ProductName}</h3>
            
             <p className="product-price">{result.price}₹</p>
             <p className="product-description">{result.description}</p>
             <button
               className="add-to-cart-button"
               onClick={() => toggleWishList(result.id)}
             >
               {wishList.includes(result.id) ? (
                 <FaHeart className="wish-list-icon liked" />
               ) : (
                 <FaHeart className="wish-list-icon" />
               )}
             </button>
           </div>
         </div>
          ))}
        </ul>
      )}
    </div>

    <SimpleFooter/>
    </>
  );
};

export default Search;
