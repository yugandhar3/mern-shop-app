const express = require("express");
const productRoute = require('./product');
const userRoute=require("./user");
const orderRoute=require("./order");
const cartRoute= require('./cart');

const router = express();

router.use('/api', productRoute);
router.use('/api',userRoute);
router.use('/api',orderRoute);
router.use('/api',cartRoute)

module.exports = router;