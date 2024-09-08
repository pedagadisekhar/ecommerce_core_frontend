import axios from "axios";
import React from "react";
import { useState} from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../header/header';
import About from "../about/about";
import { Link } from 'react-router-dom';
import './allproduct.css';
import BASE_URL from '../../config';
// import backgroundImage from '../../assets/images/home.jpg';
import aboutImage from '../../assets/images/about.jpg';
// import aboutImage1 from '../../assets/images/about-1.jpeg';

const Homepage = ()=>{
   
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  const [products, setProducts] = useState([]);

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

    useEffect(() => {
      const fetchData = async () => {
        try {
          //var token = localStorage.getItem('token');
          const response = await axios.get(`${BASE_URL}/api/getproducts`);
          console.log(response.data);
          setData(response.data);
          console.log(setData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // if (token) {
          fetchData();
      //   }
      }, []);
 
   return (
    <div className="App">
     <Header/>
{/*      
     <section className="home" id="home"  style={{ background: `url(${backgroundImage}) no-repeat`}}>
            <div className="content">
                <h3>the best courses you will find here</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, corrupti. Atque provident veniam eligendi doloribus placeat reiciendis!</p>
                <a href="#" className="btn">
                    <span className="text text-1">learn more</span>
                    <span className="text text-2" aria-hidden="true">learn more</span>
                </a>
            </div>
        </section> */}
  
        <div className="product-list">
      {products.map(product => (
        <div key={product.ProductId} className="product-card">
          <Link to={`/product/${product.ProductId}`}>
         <img src={`${BASE_URL}/${product.imageUrl}`} alt={product.name} className="product-image" height="200px" width="200px"/>
         <h2>{product.ProductName}</h2>
         </Link>
         
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Inventory: {product.inventory}</p>
          <p>SKU: {product.sku}</p>
        </div>
      ))}
    </div>


   <About></About>
    
    
    </div>
  );
}
export default Homepage