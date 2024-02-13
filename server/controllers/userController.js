const User = require('../models/user');

// This method will create the user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password})
  try {
      await user.save();
      res.status(201).send(user);
  } catch (error) {
      res.status(409).send({ message: error.message });
  }
  
};

// This method get the users
const getUser = async (req, res) => {
  try {
    const products = await User.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = {
  createUser,
  getUser
};
