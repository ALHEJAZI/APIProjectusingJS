const mongoose = require('mongoose');
//create Schema
const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : [ true , 'it is alredy exist' ],
        required :[true , 'Category required'],
        minlength:[3 , 'must be more than 3'],
        maxlength:[25, 'must be less than 3'],
        
    },
    slug:{
        type:String,
        lowercase:true
    }

    
},
{timestamps:true}
);

//create model 
const Category = mongoose.model('Category' , categorySchema);

module.exports = Category;


