const express = require('express');

const {createCheckout,getCheckoutDetails,getOrderDetails} = require("../controllers/orderController");

const router = express();

router.post('/create-checkout-session',createCheckout);
router.get('/get-order-details/:sessionId',getCheckoutDetails);
router.get('/get-orders/:userId',getOrderDetails);

module.exports=router;
