const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
// Định nghĩa các tuyến đường API ở đây
router.post('/login', loginController.checkLogin);

router.post('/register', registerController.upload, registerController.registerUser);

router.get('/product/list', productController.getProduct);

router.get('/product/:id', productController.getProductById);

router.post('/cart/products', cartController.getCartProduct)
module.exports = router;