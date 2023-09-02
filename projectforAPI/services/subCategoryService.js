const  {default : slugify} = require('slugify');
const AsyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const SubCategory = require('../models/subCategory');



exports.setCategoryIdToBody = (_req , _res, next)=>{
    if(!_req.body.category) _req.body.category = _req.params.categoryId;
    next()

}


// @desc    create Categories
// @Route   POST api/v1/categories
// @Access  Privte
exports.createSubCategory = AsyncHandler ( async (_req , _res)=>{

    const {name , category} = _req.body;

    const subcategory = (await SubCategory.create({ name, slug: slugify(name), category }))
    _res.status(201).json({data:subcategory});
    });



// @desc    Get Categories
// @Route   GET api/v1/categories
// @Access  privte
exports.getSubCategories = AsyncHandler(async (_req , _res)=>{
    const page = _req.query.page * 1 || 1;
    const limit = _req.query.limit * 1  || 5;
    const skip = (page-1)*limit;

    let filterObject={};

    if(_req.params.categoryId) filterObject = {category:_req.params.categoryId};

    const subcategories=  await SubCategory.find(filterObject)
        .skip(skip)
        .limit(limit);

        console.log(_req.params);
        
    
    _res
        .status(200)
        .json({result:subcategories.length , page , data:subcategories })
    });


// @desc    Get Category by id
// @Route   GET api/v1/categories:id
// @Access  Public
exports.getSubCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    const subCategory =  await SubCategory.findById(id).populate({path : 'category' , select :'name -_id'}); 
    if(!subCategory){
      return next(new ApiError(`no Sub Category for this ${id}` , 404))
    }
    _res.status(200).json({data:subCategory});
});



// @desc    Update Category by id
// @Route   PUT api/v1/categories:id
// @Access  Privte
exports.updateSubCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;
    const {name} = _req.body;
    const olddata = await SubCategory.find({_id:id});
    const subcategory =  await SubCategory.findOneAndUpdate({_id:id},{name:name , slug:slugify(name)}, { new: true });
    if(!subcategory){
        return next(new ApiError(`no sub Category for this ${id}` , 404))
    }
    _res.status(200).json({data:subcategory , oldDATA : olddata});
});


// @desc    delete Category by id
// @Route   delet api/v1/categories:id
// @Access  Privte
exports.deleteSubCategory = AsyncHandler(async (_req , _res , next)=>{
    const {id} = _req.params;

    const subcategory =  await SubCategory.findOneAndDelete({_id:id});
    if(!subcategory){
        return next(new ApiError(`no Category for this ${id}` , 404))
    }
    _res.status(204).send("done");
});


