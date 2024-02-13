const express = require('express');
const router = express.Router();
const {getAllProducts,createProducts} = require('../controllers/productController');

router.get('/products', getAllProducts);
router.post('/product', createProducts);

module.exports = router;
