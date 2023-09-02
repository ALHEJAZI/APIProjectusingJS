const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({

    name :{
        type : String,
        trim : true,
        unique : [ true , 'it is alredy exist' ],
        minlength :[ 1 , "too short name"],
        maxlength :[30 , "too long name "]
    },
    slug:{
        type : String,
        lowercase : true
    },
    category :{
        type : mongoose.Schema.ObjectId ,
        ref : 'Category',
        required :[ true , 'must be belong to main category']
    }

} , 
    
{timestamps : true});


module.exports = mongoose.model("subCategory" , subCategorySchema);


