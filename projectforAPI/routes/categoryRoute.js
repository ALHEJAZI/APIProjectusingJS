const express = require('express');
const { getCategories , createCategory , getCategory , updateCategory , deleteCategory} = require('../services/categoryService');
const {validationResult, param} = require('express-validator');
const { getCategoryValidator, createCategoryValidator, updategetCategoryValidator, deleteCategoryValidator } = require('../utils/validators/categoryvalidator');


const router = express.Router();

router.route('/')
.get(getCategories)
.post( createCategoryValidator ,createCategory);


router.route('/:id').
get(getCategoryValidator,getCategory)
.put( updategetCategoryValidator, updateCategory)
.delete(deleteCategoryValidator , deleteCategory);


module.exports = router;