const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController')
const MW = require('../middleware/validation');

//======================== Product API ======================//

//-[1]-Create Product API
router.post('/products', MW.productValidation, productController.addProduct);

//-[2]-List Product API
router.get('/products', productController.getProductsByQuery);

//======================== Cart APIs ========================//

//-[3]-Add to Cart API
router.post('/cart', MW.cartValidation, cartController.addToCart);

//-[4]-Update item Quantity on cart API
router.put('/cart/:cartId', MW.cartIdValidation, MW.cartValidation, cartController.updateCart)

//-[5]-List cart API
router.get('/cart/:cartId', MW.cartIdValidation, cartController.getCart)


module.exports = router;