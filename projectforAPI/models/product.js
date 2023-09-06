const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
    title : {
        type : String , 
        required : true , 
        trim : true , 
        minlength : ['5' , "Too Short name " ],
        maxlength : ['200' , "too long name"]
    },
    slug : {
        type : String,
        required : true,
        lowercase : true
    },
    description : {
        type : String, 
        required : [true , "must be description"],
        minlength : [10 , "Too Short description"],
        maxlength : [2000 , "Too long description"]
    },
    price :{
        type : Number , 
        required : [true , "must be a price "],
        trim:true,
        max : [20000000000]

    },
    priceAfterDiscount : {
        type : Number
    },
    colors:[String],
    imageCover :{
        type : String,
        required : true,
    },
    images :[String],

    category:{
        type : mongoose.Schema.ObjectId ,
        ref : 'Category',
        required :[ true , 'must be belong to main category']
    },
    subcategories: [{
        type : mongoose.Schema.ObjectId,
        ref : 'subCategory',
    }]

}
,
{timestamps : true});

const Product = mongoose.model('Product' , productSchema);

module.exports = Product;