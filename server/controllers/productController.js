const Product = require('../models/product');

// This method will create the products
const createProducts = async (req, res) => {
  const { name, price, imageUrl,quantity } = req.body;
  const product = new Product({ name, price, imageUrl,quantity})
  try {
      await product.save();
      res.status(201).send(product);
  } catch (error) {
      res.status(409).send({ message: error.message });
  }
};

// This method will return all the products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = {
  createProducts,
  getAllProducts
};
