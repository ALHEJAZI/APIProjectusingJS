const { default: slugify } = require('slugify');
const Product = require('../models/product');
// eslint-disable-next-line import/order
const AsyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');


// @desc    Get List of product
// @Route   GET api/v1/productss
// @Access  Public
exports.getProducts = AsyncHandler(async (_req , _res)=>{
const page = _req.query.page * 1 || 1;
const limit = _req.query.limit * 1  || 10;
const skip = (page-1)*limit;

const products=  await Product.find({}).skip(skip).limit(limit);

    _res.status(200).json({result:products.length , page , data:products })
});

// @desc    Get product by id
// @Route   GET api/v1/products:id
// @Access  Public
exports.getProduct = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    const product=  await Product.findById(id).populate({path : 'category' , select :'name -_id'}); 
    if(!product){
       // _res.status(404).json({msg:`No category for this ${id}`});
      return next(new ApiError(`no product for this ${id}` , 404))
    }
    _res.status(200).json({data:product});
});


// @desc    Update Category by id
// @Route   PUT api/v1/categories:id
// @Access  Privte
exports.updateProduct = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    _req.body.slug = slugify(_req.body.title);
    
    const product =  await Product.findOneAndUpdate({_id:id},_req.body, { new: true });
    if(!product){
        return next(new ApiError(`no product for this ${id}` , 404))
    }
    _res.status(200).json({data:product});
});


// @desc    delete Category by id
// @Route   delet api/v1/categories:id
// @Access  Privte
exports.deleteProduct = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;

    const product =  await Product.findOneAndDelete({_id:id});
    if(!product){
        return next(new ApiError(`no product for this ${id}` , 404))
    }
    _res.status(204).send("done");
});


// @desc    create product
// @Route   post api/v1/products
// @Access  Privte
exports.createProduct = AsyncHandler ( async (_req , _res)=>{
    _req.body.slug = slugify(_req.body.title);

    const product = await  Product.create(_req.body);
    _res.status(201).json({data:product});
    });
