import React, { useState } from 'react';
import './trending.css';
import shirts from '../../assets/images/shirts.jpg';
import download from '../../assets/images/download.jpeg';
import tens from '../../assets/images/tens.jpeg';
import shorts from '../../assets/images/shorts.jpeg';
import { FaHeart } from 'react-icons/fa';

// Define products array
const products = [
  { id: 1, name: 'SHIRTS', price: '$29.99', imageUrl: shirts, description: 'Good product' },
  { id: 2, name: 'HODDIES', price: '$39.99', imageUrl: download, description: 'Good product' },
  { id: 3, name: 'UNI-SEX TEES', price: '$49.99', imageUrl: tens, description: 'Good product' },
  { id: 4, name: 'SHORTS', price: '$59.99', imageUrl: shorts, description: 'Good product' },
];

const TrendingProducts = () => {
  // State for wish list products
  const [wishList, setWishList] = useState([]);

  // Add or remove product from wish list
  const toggleWishList = (productId) => {
    setWishList((prevWishList) =>
      prevWishList.includes(productId)
        ? prevWishList.filter((id) => id !== productId)
        : [...prevWishList, productId]
    );
  };

  return (
    <div className="trending-products">
      <h2>Trending Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <p className="product-description">{product.description}</p>
              <button
                className="add-to-cart-button"
                onClick={() => toggleWishList(product.id)}
              >
                {wishList.includes(product.id) ? (
                  <FaHeart className="wish-list-icon liked" />
                ) : (
                  <FaHeart className="wish-list-icon" />
                )}
                {wishList.includes(product.id) ? '' : ''}
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
