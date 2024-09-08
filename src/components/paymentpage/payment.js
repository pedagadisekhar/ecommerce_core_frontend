import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import BASE_URL from '../../config';
import './payment.css'


const PaymentPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL
  const [orderData, setOrderData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('online1');
  const [isProcessing, setIsProcessing] = useState(false);

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

  if (!orderData) {
    return <p>Loading order details...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>
          <strong>Total:</strong> ${orderData.order?.total}
        </p>

        <h3>Items:</h3>
        <ul>
          {orderData.items?.map((item) => (
            <li key={item.OrderItemid}>
              {item.productName} - {item.quantity} x ${item.price} = ${item.total}
            </li>
          ))}
        </ul>

        <h3>Shipping Address:</h3>
        {orderData.address && orderData.address.length > 0 ? (
          <p>
            {orderData.address[0].name}
            <br />
            {orderData.address[0].address}, {orderData.address[0].city}
            <br />
            {orderData.address[0].state}, {orderData.address[0].postalCode}, {orderData.address[0].country}
            <br />
            Mobile: {orderData.address[0].mobile}
          </p>
        ) : (
          <p>No shipping address found.</p>
        )}
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <h2>Choose Payment Method</h2>

        <label>
          <input
            type="radio"
            value="online1"
            checked={selectedPayment === 'online1'}
            onChange={handlePaymentChange}
          />
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="online2"
            checked={selectedPayment === 'online2'}
            onChange={handlePaymentChange}
          />
          UPI Payment
        </label>

        <label>
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
  
  onClick={() => {
   
      alert('Order Processed Successfully!');
      // You can add your payment processing logic here
    
  }}
>
 Submit Payment
</button>
      </div>
    </div>
  );
};

export default PaymentPage;
