import React from 'react'
import { Button } from 'react-bootstrap'
import * as api from "../Redux/api";

function PaymentButton({ cart, applyCoupon }) {
  const userId= localStorage.getItem('userId')?.replace(/"/g, '')
  //This function will call the checkout api
  const handleCheckout = async () => {
    await api.checkout({
      cart,
      applyCoupon,
      userId
    }).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
         api.deleteAllCartItem(userId)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div>
      <Button className='m-2' onClick={handleCheckout}>Payment</Button>
    </div>
  )
}

export default PaymentButton
