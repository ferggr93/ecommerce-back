
const express = require('express');
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth');
const upload = require('../middlewares/uploadProductImg')
const productsRoutes = require('../controllers/product.controller')

router.get('/products', productsRoutes.GetProducts);
router.delete('/products/:id',jwtVerify,  productsRoutes.DeleteProduct);
router.post('/products',  upload, productsRoutes.CreateProduct);
router.put('/products/:id', jwtVerify, productsRoutes.UpdateProduct);
module.exports = router;