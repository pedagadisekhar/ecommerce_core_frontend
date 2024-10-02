import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa';
import './allproduct.css';
import Header from '../header/header';
import SimpleFooter from '../Footers/SimpleFooters';
import BASE_URL from '../../config';
import { Link, useLocation } from 'react-router-dom';
const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState([]);

  const toggleWishList = (productId) => {
    setWishList((prevWishList) =>
      prevWishList.includes(productId)
        ? prevWishList.filter((id) => id !== productId)
        : [...prevWishList, productId]
    );
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getproducts`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>
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
              <button className="amazon-add-to-cart-button">Add to Cart</button>
              <button
                className="amazon-wish-list-button"
                onClick={() => toggleWishList(product.id)}
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
    
    <SimpleFooter/>
    </>
  );
}  

export default Allproduct;
