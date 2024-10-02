import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/header';
import BASE_URL from '../../config';
import './wishlist.css'; // Ensure the correct CSS file path
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../Footers/SimpleFooters';

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      axios.post(`${BASE_URL}/api/getwishlistidbased`, { userId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setWishlistData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    } else {
      if (!userId) {
        setError('User ID not found');
      } else if (!token) {
        setError('Token not found');
      }
      setLoading(false);
    }
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/removewishlist`, { wishlistId: itemId });
      if (response.status === 200) {
        setWishlistData(wishlistData.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="myntra-wishlist-page">
        <h2>Your Wishlist</h2>
        {wishlistData.length > 0 ? (
          <ul className="myntra-wishlist-container">
            {wishlistData.map((item) => (
              <li key={item.productId} className="myntra-wishlist-item">
                <button className="myntra-remove-item" onClick={() => handleRemove(item.id)}>X</button>
                <img
                  src={`${BASE_URL}/${item.productImageUrl}`}
                  alt={item.productName}
                  className="myntra-product-image"
                />
                <div className="myntra-product-details">
                  <h3>{item.productName}</h3>
                  <p>Price: ₹{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="myntra-empty-message">Your wishlist is empty.</p>
        )}
      </div>
      <SimpleFooter className="myntra-footer"/>
    </>
  );
};

export default Wishlist;
