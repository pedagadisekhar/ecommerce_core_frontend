import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    landmark: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleprocessorder = () => {
    // Show the address section when "Proceed to Payment" is clicked
    setShowAddress(true);
  };

  const handleRemove = (productId) => {
    // Remove the item from cartData based on productId
    setCartData(cartData.filter(item => item.productId !== productId));
  };

  const calculateTotal = (cartData) => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
    const token = localStorage.getItem('token');   // Retrieve token from local storage

    if (userId && token) {
      axios.post(`${BASE_URL}/api/getcartsidbased`, { userId }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      })
      .then((response) => {
        setCartData(response.data);
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

  const handleCheckout = async () => {
    const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
    const token = localStorage.getItem('token');
    
    // Prepare cart items data
    const cartItems = cartData.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productImageUrl: item.productImageUrl,
      quantity: item.quantity,
      price: item.price,
    }));
  
    // Prepare the payload
    const payload = {
      userId: userId,
      cartItems: cartItems,
    };
  
    try {
      const response = await axios.post(`${BASE_URL}/api/orders`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
          "Content-Type": "application/json",
        },
      });
  
      const { orderId } = response.data; // Extract the orderId from the response
      setOrderData(orderId);

      // Call submitAddress with the orderId
      await submitAddress(orderId);
      
      // Navigate to the order confirmation page
      navigate(`/order/${orderId}`);

    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const submitAddress = async (orderId) => {
    const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
    const token = localStorage.getItem('token');
    
    // Prepare the address payload
    const payload = {
      userId: userId,
      address: address, // Ensure address is properly defined or retrieved
      orderId: orderId // Include orderId in the payload
    };
  
    try {
      await axios.post(`${BASE_URL}/api/addaddress`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Address submitted successfully");
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <ul>
          {cartData.map((item) => (
            <li key={item.productId} className="cart-item">
              <button className="remove-item" onClick={() => handleRemove(item.productId)}>X</button>
              <img src={`${BASE_URL}/${item.productImageUrl}`} alt={item.productName} className="product-image" />
              <div className="product-details">
                <h3>{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="payment-card">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <p className="label">Total Items:</p>
          <p className="value">{cartData.reduce((total, item) => total + item.quantity, 0)}</p>
        </div>
        <div className="summary-row">
          <p className="label">Total Price:</p>
          <p className="value">${calculateTotal(cartData)}</p>
        </div>
        <div className="summary-row">
          <p className="label">Delivery:</p>
          <p className="value">$30</p>
        </div>
        <div className="summary-row">
          <h1 className="label">Total Amount:</h1>
          <h1 className="value">${calculateTotal(cartData) + 30}</h1>
        </div>
        <button className="pay-now-button" onClick={handleprocessorder}>
          Proceed to Payment
        </button>
      </div>

      {showAddress && (
        <div className="address-section">
          <h3>Enter Shipping Address</h3>
          <input type="text" name="name" placeholder="Name" value={address.name} onChange={handleAddressChange} />
          <input type="text" name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleAddressChange} />
          <input type="text" name="address" placeholder="Address" value={address.address} onChange={handleAddressChange} />
          <input type="text" name="landmark" placeholder="Landmark" value={address.landmark} onChange={handleAddressChange} />
          <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} />
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} />
          <input type="text" name="state" placeholder="State" value={address.state} onChange={handleAddressChange} />
          <input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleAddressChange} />
          <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} />
          <button className="submit-address-button" onClick={() => handleCheckout()}>
            Submit Address and Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
