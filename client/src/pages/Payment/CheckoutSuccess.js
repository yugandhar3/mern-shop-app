import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from "../../Redux/api";
import { Button, Container } from 'react-bootstrap';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  let userId = localStorage.getItem('userId')?.replace(/"/g, '');
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (sessionId) {
          // Case 1: After checkout process is complete
          const response = await api.getCheckoutDetails(sessionId);
          if (response.data) {
            const orderResponse = await api.getOrderDetails(response.data.userId);
            setOrderDetails(orderResponse.data);
          }
        } else {
          // Case 2: Directly accessing the order page
          const orderResponse = await api.getOrderDetails(userId);
          setOrderDetails(orderResponse.data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [sessionId, userId]);

  const backToShop = () => {
    navigate('/')
  }
  return (
    <Container>
      <h2>Order Details</h2>
      {orderDetails.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>PaymentMethod</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.amount / 100} USD</td>
                <td>{item.paymentStatus}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
        <p>Orders not yet placed </p>
      )}

      <Button onClick={() => backToShop()}>Back to Shop</Button>
    </Container>
  );
};

export default CheckoutSuccess;
