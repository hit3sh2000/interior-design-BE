const express = require('express'); //importing express
var router = express.Router();
const productController = require('../controllers/productController')


router.post('/CreateCategory', productController.CreateCategory )
router.get('/getCategories', productController.getCategories )
router.post('/createProduct', productController.createProduct )
router.post('/AddProductInCategory', productController.AddProductInCategory )

module.exports = router;
