import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Button, Container, Row, Col } from 'react-bootstrap';
import TableComponent from "../../components/TableComponent";
import { getCartDetails,updateCartItemQuantity } from "../../Redux/reduxThunk/cart";
import PaymentButton from '../../components/PaymentButton';
import Form from 'react-bootstrap/Form';
import * as api from "../../Redux/api"

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const userId = localStorage.getItem('userId')?.replace(/"/g, '')
 
  useEffect(()=>{
      dispatch(getCartDetails(userId));
  },[])
  //This function will increment and decreement the quantity of items
  const updateProductQuantity = async(productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(productId)
    } else {
      const limitedQuantity = Math.min(newQuantity, 10);
      const data={ productId:productId, 
                   newQuantity: limitedQuantity }
      dispatch(updateCartItemQuantity(data));
    }
  };
  //This function will remove particular cart item
  const removeItem = async (productId) => {
    await api.deleteCartItem(productId).then((res) => {
      dispatch(getCartDetails(userId));
    }).catch((err) => {
      console.log(err)
    })

  }

  // This function will remove all cart items
  const clearCart = async () => {
    await api.deleteAllCartItem(userId).then((res) => {
      dispatch(getCartDetails(userId));
    }).catch((err) => {
      console.log(err)
    })
  }
  // Calculate discount price
  const totalPrice = cartData?.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = applyCoupon ? totalPrice * 0.1 : 0;
  const discountPrice = totalPrice - discount;

  return (
    <Container>
      <Row className='justify-content-center py-4'>
        <h4 className='text-center'>{!cartData.length > 0 ? 'Your cart is empty' : ''}</h4>
        {cartData.length > 0 &&
          <>
            <Col md={8}>
              <h4 >Cart Items</h4>
              <TableComponent updateProductQuantity={updateProductQuantity} removeItem={removeItem} />
            </Col>
            <Col md={4}>
              <h4>Payment Details</h4>
              <hr />
              <div className='d-flex justify-content-between'>
                <h6>Total Price: </h6>
                <h6>$. {totalPrice}</h6>
              </div>
              <hr />
              <div >
                <p><b>Apply coupon</b></p>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Save 10% more on this order"
                    onChange={() => setApplyCoupon(!applyCoupon)}
                  />
                </Form>
              </div>

              <hr />
              <div className='d-flex justify-content-between'>
                <h6>Discount Price: </h6>
                <h6>$. {discountPrice}</h6>
              </div>
              <hr />
              <div className='d-flex justify-content-end'>
                <Button variant='danger' className='m-2' onClick={() => clearCart()}>Clear Cart</Button>
                <PaymentButton cart={cartData} applyCoupon={applyCoupon} />
              </div>
            </Col>
          </>
        }
      </Row>
    </Container>
  );
};

export default ShoppingCart;
