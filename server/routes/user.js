const express = require('express');
const router = express.Router();
const {createUser,getUser} = require('../controllers/userController');

router.get('/user', getUser);
router.post('/user', createUser);

module.exports = router;
