const express = require('express');



const {createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, setCategoryIdToBody } = require('../services/subCategoryService');
const { createsubCategoryValidator, getsubCategoryValidator, updategetsubCategoryValidator, deletesubCategoryValidator } = require('../utils/validators/subcategoryvalidator');


const router = express.Router({mergeParams:true});

router.route('/')
.post( setCategoryIdToBody , createsubCategoryValidator ,createSubCategory);
router.route('/')
.get(  getSubCategories);

router.route('/:id')
.get(getsubCategoryValidator , getSubCategory)
.put(updategetsubCategoryValidator , updateSubCategory)
.delete(deletesubCategoryValidator , deleteSubCategory);

module.exports = router; 

