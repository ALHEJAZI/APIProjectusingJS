const express = require('express');
const { getProducts , createProduct , getProduct , updateProduct , deleteProduct} = require('../services/productServices');
// eslint-disable-next-line no-unused-vars



const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productsvalidators');


const router = express.Router();




router.route('/')
.get(getProducts)
.post( createProductValidator ,createProduct);


router.route('/:id').
get(getProductValidator,getProduct)
.put( updateProductValidator, updateProduct)
.delete(deleteProductValidator , deleteProduct);


module.exports = router;