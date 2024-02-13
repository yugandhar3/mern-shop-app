const Cart = require('../models/cart');

//This method will add products to the cart
const createCart = async (req, res) => {
  const { imageUrl, name, price, quantity, _id,userId } = req.body
  const cart = new Cart({
    userId:userId,
    productId: _id,
    name: name,
    price: price,
    imageUrl: imageUrl,
    quantity: quantity
  })
  try {
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }

};
// This method will return the cart products
const getCart = async (req, res) => {
  try {
   const userId= req.params.id
    const cart = await Cart.find({userId});
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
// This method will delete the cart item
const deleteCartItem = async (req, res) => {
  try {
   const cartId= req.params.id
    const cart = await Cart.findByIdAndDelete({_id:cartId});
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
// This method will remove all cart items
const deleteAllCartItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedItems = await Cart.deleteMany({ userId });
    res.status(200).send({ message: 'All cart items deleted successfully', deletedCount: deletedItems.deletedCount });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
// This method will update the item quantity
const updateCartItem = async (req, res) => {
  const {productId,newQuantity}=req.body
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      productId,
      { quantity: newQuantity },
      { new: true } 
    );
    res.status(200).send(updatedCartItem);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = {
  createCart,
  getCart,
  deleteCartItem,
  deleteAllCartItem,
  updateCartItem
};
