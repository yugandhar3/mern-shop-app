const User = require('../models/user');
const Order =require('../models/order');
const Stripe = require('stripe');
require("dotenv").config();

const stripe =Stripe(process.env.STRIPE_KEY);

// This method will create the orders
const createCheckout = async (req, res) => {
  try {

      const line_items =req.body.cart.map((item)=>{
        return{
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images:[item.imageUrl],
                metadata:{
                  id:item.id
                }
              },
              unit_amount: req.body.applyCoupon ? Math.round((item.price * 0.9) * 100) : item.price*100 ,
            },
            quantity: item.quantity,
        }
      })
      
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        metadata: {
          userId:req.body.userId , 
        },
      });
      res.status(200).send({url:session.url});
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
  
};
// This method will return the single order details
const getCheckoutDetails = async (req, res) => {
  try {
        const { sessionId } = req.params;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const userId = session.metadata.userId; 
        const user = await User.findOne({ _id: userId });
    
        // Check if the order already exists in the database
        const existingOrder = await Order.findOne({ orderId: session.id });
    
        if (!existingOrder) {
          // Insert the new order into the database
          const newOrder = new Order({
            orderId: session.id,
            userId: user._id,
            amount: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            paymentMethod: session.payment_method_types[0],
            createdAt: new Date(session.created * 1000), // Convert to Date object
          });
    
          await newOrder.save();
          
          // Return the order details
          res.status(200).send({
            orderId: session.id,
            userId: newOrder.userId,
            amount: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            paymentMethod: session.payment_method_types[0],
            createdAt: new Date(session.created * 1000), // Convert to Date object
          });
        } else {
          // Return the existing order details
          res.status(200).send({
            orderId: existingOrder.id,
            userId: existingOrder.userId,
            amount: existingOrder.amount_total,
            currency: existingOrder.currency,
            paymentStatus: existingOrder.paymentStatus,
            paymentMethod: existingOrder.paymentMethod,
            createdAt:existingOrder.createdAt
          });
        }
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
// This method will return the all order of user
const getOrderDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCheckout,
  getCheckoutDetails,
  getOrderDetails
};
