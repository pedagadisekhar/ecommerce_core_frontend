import React, { useState, useEffect } from 'react';
import './trending.css';
import { FaHeart } from 'react-icons/fa';
import BASE_URL from '../../config';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const TrendingProducts = () => {
  // State for trending products and wish list
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending products from API when the component mounts
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getTrendingProducts`);
        if (!response.ok) {

          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
       console.log(data[0])
       
       
        setProducts(data[0]); // Assuming the API returns an array of products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingProducts();
  }, []);
  
  const handleAddToCart = async (productId, quantity,inventory) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('UserId');
    if(quantity<inventory){

    if (!token || !userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/addtocart`,
        {
          productId,
          userId,
          quantity,
          size: 'xl',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        console.log(`Product ${productId} added to cart`);
        alert("your product added succesfully to the cart")

      } else {
        console.error('Failed to add product to cart');
      }
    } catch (err) {
      console.error('Error adding product to cart:', err.message);
    }
  }else{
    alert("Quantatity Not Avaliable")
  }
  };
  
  const handleAddToWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('UserId');

    if (!token || !userId) {
      console.error('User is not authenticated');
      alert('Please Sign In')
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/addtowishlist`,
        {
          productId,
          userId,
          quantity:'1',
          size: 'm'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        console.log(`Product ${productId} added to wishlist`);
        alert('your product added succesfully to the cart')
      } else {
        console.error('Failed to add product to wishlist');
      }
    } catch (err) {
      console.error('Error adding product to wishlist:', err.message);
    }
  };

  // Add or remove product from wish list
  const toggleWishList = (productId) => {
    setWishList((prevWishList) =>
      prevWishList.includes(productId)
        ? prevWishList.filter((id) => id !== productId)
        : [...prevWishList, productId]
    );
  };

  // Display loading or error message if applicable
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <div className="amazon-products-section">
    <h2>Trending Products</h2>
    <div className="amazon-products-container">
      {products.map((product) => (
        <div key={product.id} className="amazon-product-card">
          <div className="amazon-image-container">
            <Link to={`/product/${product.ProductId}`}>
              <img src={`${BASE_URL}/${product.imageUrl}`} alt={product.ProductName} />
            </Link>
          </div>
          <div className="amazon-product-info">
            <h3 className="amazon-product-name">{product.ProductName}</h3>
            <p className="amazon-product-price">{product.price}₹</p>
            <p className="amazon-product-description">{product.description}</p>
          </div>
          <div className="amazon-action-buttons">
          <Link to={`/product/${product.ProductId}`}>
            <button className="amazon-add-to-cart-button">Add to Cart</button>
            </Link>
            <button
              className="amazon-wish-list-button"
             onClick={() => handleAddToWishlist(product.id)}
            >
              {wishList.includes(product.id) ? (
                <FaHeart className="amazon-wish-list-icon liked" />
              ) : (
                <FaHeart className="amazon-wish-list-icon" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  </>
  );
};

export default TrendingProducts;
