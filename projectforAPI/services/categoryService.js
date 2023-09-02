const { default: slugify } = require('slugify');
const Category = require('../models/category');
// eslint-disable-next-line import/order
const AsyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');


// @desc    Get Categories
// @Route   GET api/v1/categories
// @Access  Public
exports.getCategories = AsyncHandler(async (_req , _res)=>{
const page = _req.query.page * 1 || 1;
const limit = _req.query.limit * 1  || 2;
const skip = (page-1)*limit;
const categories=  await Category.find({}).skip(skip).limit(limit);

    _res.status(200).json({result:categories.length , page , data:categories })
});

// @desc    Get Category by id
// @Route   GET api/v1/categories:id
// @Access  Public
exports.getCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    const category=  await Category.findById(id); 
    if(!category){
       // _res.status(404).json({msg:`No category for this ${id}`});
      return next(new ApiError(`no Category for this ${id}` , 404))
    }
    _res.status(200).json({data:category});
});


// @desc    Update Category by id
// @Route   PUT api/v1/categories:id
// @Access  Privte
exports.updateCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    const {name} = _req.body;
    
    const category =  await Category.findOneAndUpdate({_id:id},{name:name , slug:slugify(name)}, { new: true });
    if(!category){
        return next(new ApiError(`no Category for this ${id}` , 404))
    }
    _res.status(200).json({data:category});
});


// @desc    delete Category by id
// @Route   delet api/v1/categories:id
// @Access  Privte
exports.deleteCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;

    const category =  await Category.findOneAndDelete({_id:id});
    if(!category){
        return next(new ApiError(`no Category for this ${id}` , 404))
    }
    _res.status(204).send("done");
});


// @desc    create Categories
// @Route   post api/v1/categories
// @Access  Privte
exports.createCategory = AsyncHandler ( async (_req , _res)=>{
    const name = _req.body.name;
    const category = await  Category.create({name , slug :  slugify(name)});
    _res.status(201).json({data:category});
    });
