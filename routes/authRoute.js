const express = require('express'); //importing express
var router = express.Router();
const authController = require('../controllers/authController')

router.route('/')
.get(authController.getUser)//to get all user

//to login user
router.post('/login', authController.Login )
router.post('/register', authController.Register )

module.exports = router;
