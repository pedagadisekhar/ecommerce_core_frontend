import axios from "axios";
import './myorder.css';
import React, { useEffect, useState } from "react";
import BASE_URL from '../../config';
import Header from '../header/header';

import SimpleFooter from '../Footers/SimpleFooters';


const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`${BASE_URL}/api/myorders`, 
          { userId: userId }, // Include userId in the request body
          { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
        );
        setOrders(response.data[0][0]);
         console.log(response.data[0]);

      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="my-orders-app">
        <h1 className="my-orders-header">My Orders</h1>
        {orders.length === 0 ? (
          <p className="my-orders-no-data">No orders found</p>
        ) : (
          <ul className="my-orders-list">
            {orders.map((order) => (
              <li key={order.orderId} className="my-orders-list-item">
                <div className="my-orders-image-container">
                  <img 
                    src={`${BASE_URL}/${order.productImageUrl}`} 
                    alt={order.productName} 
                    className="my-orders-image" 
                  />
                </div>
                <div className="my-orders-details">
                  <p>Order ID: {order.orderId}</p>
                  <p>Price: {order.price}₹</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default MyOrder;
