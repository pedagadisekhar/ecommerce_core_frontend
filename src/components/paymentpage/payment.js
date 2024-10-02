import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import BASE_URL from '../../config';
import Header from '../header/header';
import './payment.css';
import axios from 'axios';
import SimpleFooter from '../Footers/SimpleFooters';


const PaymentPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL
  const [orderData, setOrderData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('online1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch the order data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(orderId);

    fetch(`${BASE_URL}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderData(data))
      .catch((error) => console.error('Error fetching order data:', error));
  }, [orderId]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true); // Set processing state to true
    const token = localStorage.getItem('token');
    const finalTotal = orderData?.order?.total - orderData?.order?.discountamount;
    const paymentData = {
      orderId: orderData?.order?.orderid,
      userid: orderData?.order?.userId,
      addressid: orderData?.address[0].addressid,
      total: finalTotal,
      address: orderData?.address[0], // Sending the first address
      items: 1,
      paymentMethod: selectedPayment,
    };
    try {
      const response = await axios.post(`${BASE_URL}/api/payments`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        // Payment successful, show modal
        setShowModal(true);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing payment.');
    } finally {
      setIsProcessing(false); // Set processing state back to false
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  if (!orderData) {
    return <p>Loading order details...</p>; // Show loading message while data is being fetched
  }

  return (
    <>
    <Header/>

    <div className="payment-page">
      <div>
      <h1 className="payment-title">Payment Page</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-total">
  <p>
    <span className="label"><strong>Total:</strong></span> 
    <span className="value">${orderData.order?.total}</span>
  </p>
  <p>
    <span className="label"><strong>Discount:</strong></span> 
    <span className="value">${orderData.order?.discountamount}</span>
  </p>
  <p>
    <span className="label final-total"><strong>Final Total:</strong></span> 
    <span className="value">${orderData.order?.total - orderData.order?.discountamount}</span>
  </p>
</div>


        <h3>Items:</h3>
        <ul className="item-list">
          {orderData.items?.map((item) => (
           <li key={item.OrderItemid}>
           <span className="item-name">{item.productName}</span>
           <div className="item-details">
             <span className="item-quantity">{item.quantity} x</span>
             <span className="item-price">${item.price} = ${item.total}</span>
           </div>
         </li>
          ))}
        </ul>

        <h3>Shipping Address:</h3>
        {orderData.address && orderData.address.length > 0 ? (
          <p className="address-details">
            {orderData.address[0].name}
            <br />
            {orderData.address[0].address}, {orderData.address[0].city}
            <br />
            {orderData.address[0].state}, {orderData.address[0].postalCode}, {orderData.address[0].country}
            <br />
            Mobile: {orderData.address[0].mobile}
          </p>
        ) : (
          <p className="no-address">No shipping address found.</p>
        )}
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <h2>Choose Payment Method</h2>

        <label className="payment-label">
          <input
            type="radio"
            value="online1"
            checked={selectedPayment === 'online1'}
            onChange={handlePaymentChange}
          />
          Credit/Debit Card
        </label>

        <label className="payment-label">
          <input
            type="radio"
            value="online2"
            checked={selectedPayment === 'online2'}
            onChange={handlePaymentChange}
          />
          UPI Payment
        </label>

        <label className="payment-label">
          <input
            type="radio"
            value="cod"
            checked={selectedPayment === 'cod'}
            onChange={handlePaymentChange}
          />
          Cash on Delivery (COD)
        </label>
      </div>

      {/* Submit Payment Button */}
      <div>
        <button 
          className="submit-payment-button"
          onClick={handlePaymentSubmit}
          disabled={isProcessing} // Disable button while processing
        >
          {isProcessing ? 'Processing...' : 'Submit Payment'}
        </button>
      </div>

      {/* Modal Popup for Payment Success */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>

      )}

    </div>
   

    </div>
    <SimpleFooter/>
    </>

  );
};

export default PaymentPage;
