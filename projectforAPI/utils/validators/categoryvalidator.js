const {check} = require('express-validator')
const validator = require('../../middelwares/validatormiddelwaer')



exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id") , 
    validator,
];

exports.createCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage("name required")
    .isLength({min:3})
    .withMessage("the name is too short")
    .isLength({max:32})
    .withMessage("the name is too Long") , 

    validator,
];


exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id") , 
    validator,
];

exports.updategetCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id") , 
    validator,
];
