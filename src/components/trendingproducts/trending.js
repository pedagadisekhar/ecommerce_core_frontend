import React, { useState, useEffect } from 'react';
import './trending.css';
import { FaHeart } from 'react-icons/fa';
import BASE_URL from '../../config';

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
        const response = await fetch('http://ec2-3-225-106-91.compute-1.amazonaws.com:8080/api/getTrendingProducts');
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
    <div className="trending-products">
      <h2>Trending Products</h2>
      <div className="trending-products-container">
        {products.map((product) => (
          <div key={product.id} className="trending-product-card">
            <div className="trending-image-container">
              <img src={`${BASE_URL}/${product.imageUrl}`} alt={product.name} />
            </div>
            <div className="trending-product-info">
              <h3>{product.ProductName}</h3>
              <p className="trending-product-price">{product.price}</p>
              <button
                className="trending-add-to-cart-button"
                onClick={() => toggleWishList(product.id)}
              >
                {wishList.includes(product.id) ? (
                  <FaHeart className="trending-wish-list-icon liked" />
                ) : (
                  <FaHeart className="trending-wish-list-icon" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
