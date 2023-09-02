const express = require('express');
const { getCategories , createCategory , getCategory , updateCategory , deleteCategory} = require('../services/categoryService');
// eslint-disable-next-line no-unused-vars

const subCategoryRoute = require('./subCategoryRoute')

const { getCategoryValidator, createCategoryValidator, updategetCategoryValidator, deleteCategoryValidator } = require('../utils/validators/categoryvalidator');


const router = express.Router();


router.use('/:categoryId/subcategories' , subCategoryRoute )

router.route('/')
.get(getCategories)
.post( createCategoryValidator ,createCategory);


router.route('/:id').
get(getCategoryValidator,getCategory)
.put( updategetCategoryValidator, updateCategory)
.delete(deleteCategoryValidator , deleteCategory);


module.exports = router;