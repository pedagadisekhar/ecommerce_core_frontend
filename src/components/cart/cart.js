import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/header';
import BASE_URL from '../../config';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import SimpleFooter from '../Footers/SimpleFooters';


Modal.setAppElement('#root'); // Ensure accessibility by setting the app element

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCode, setCouponCode] = useState(''); // Add state for coupon code
  const [discountAmount, setDiscountAmount] = useState(0);
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

  const handleProceedToPayment = () => {
    setShowAddressModal(true); // Show the address modal
  };

  const handleCloseModal = () => {
    setShowAddressModal(false); // Close the modal
  };

  const calculateTotal = (cartData) => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const applyCoupon = () => {
    if (couponCode === 'flat5') {
      const totalAmount = calculateTotal(cartData);
      const discount = (totalAmount * 0.05).toFixed(2);
      setDiscountAmount(discount); // Set discount amount if coupon is valid
    } else {
      setDiscountAmount(0); // No discount if coupon is invalid
    }
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
  
  const handleRemove = async (itemId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/removecartsidbased`, { cartid: itemId });
      if (response.status === 200) {
        console.log('Item removed successfully');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
   
    setCartData(cartData.filter(item => item.id !== itemId));
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem('UserId'); // Retrieve userId from local storage
    const token = localStorage.getItem('token');
    
    const cartItems = cartData.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productImageUrl: item.productImageUrl,
      quantity: item.quantity,
      price: item.price,
      cartid: item.id
    }));
  
    const payload = {
      userId: userId,
      cartItems: cartItems,
      discount: discountAmount
    };
    console.log(payload)
    try {
      const response = await axios.post(`${BASE_URL}/api/orders`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const { orderId } = response.data;
      setOrderData(orderId);

      await submitAddress(orderId);
      navigate(`/order/${orderId}`);

    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const submitAddress = async (orderId) => {
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');
    
    const payload = {
      userId: userId,
      address: address,
      orderId: orderId
    };
   console.log(payload)
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
    <>
    <Header/>
    <div className="cart-page">
      
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <ul>
          {cartData.map((item) => (
            <li key={item.productId} className="cart-item">
              <button className="remove-item" onClick={() => handleRemove(item.id)}>X</button>
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
          <p className="value">Free</p>
        </div>
        <div className="coupon-section">
        <input 
          type="text" 
          placeholder="Enter Coupon Code" 
          value={couponCode} 
          onChange={(e) => setCouponCode(e.target.value)} 
          className="coupon-input"
        />
        <button className="apply-coupon-button" onClick={applyCoupon}>
          Apply Coupon
        </button>
        </div>

        <div className="summary-row">
          <p className="label">Discount:</p>
          <p className="value">100</p>
        </div>
        <div className="summary-row">
          <h1 className="label">Total Amount:</h1>
          <h1 className="value">${(calculateTotal(cartData) - discountAmount).toFixed(2)}</h1>
        </div>

      </div>

      <button className="pay-now-button" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>

      {/* Modal for entering address */}
      <Modal
  isOpen={showAddressModal}
  onRequestClose={handleCloseModal}
  contentLabel="Shipping Address"
  className="modal"
  overlayClassName="modal-backdrop"
>
  <button className="modal-close" onClick={handleCloseModal}>X</button>
  
  
  <div className="address-form">
  <h3>Enter Shipping Address</h3>
  
  <input 
    type="text" 
    name="name" 
    placeholder="Name" 
    value={address.name} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="mobile" 
    placeholder="Mobile Number" 
    value={address.mobile} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="address" 
    placeholder="Address" 
    value={address.address} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="landmark" 
    placeholder="Landmark" 
    value={address.landmark} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="street" 
    placeholder="Street" 
    value={address.street} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="city" 
    placeholder="City" 
    value={address.city} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="state" 
    placeholder="State" 
    value={address.state} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="postalCode" 
    placeholder="Postal Code" 
    value={address.postalCode} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <input 
    type="text" 
    name="country" 
    placeholder="Country" 
    value={address.country} 
    onChange={handleAddressChange} 
    className="address-input" 
  />
  
  <button 
    className="submit-address-button" 
    onClick={handleCheckout}
  >
    Submit and Checkout
  </button>
  </div>
  
  
</Modal>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


    </div>
    <SimpleFooter/>
    </>
  );
};

export default CartPage;
