const express = require('express');
const router = express.Router();
const {createCart,getCart,deleteCartItem,deleteAllCartItem,updateCartItem} = require('../controllers/cartController');

router.get('/cart/:id', getCart);
router.post('/cart', createCart);
router.delete('/cart/:id', deleteCartItem);
router.delete('/clearCart/:id', deleteAllCartItem);
router.put('/cart', updateCartItem);

module.exports = router;
