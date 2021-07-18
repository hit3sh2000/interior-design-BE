const express = require('express'); //importing express
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const authController = require('../controllers/authController')

router.route('/')
.get(authController.getUser)//to get all user

//to login user
router.post('/login', authController.Login )
router.post('/register', authController.Register )

module.exports = router;
