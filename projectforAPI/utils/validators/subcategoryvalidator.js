const {check} = require('express-validator')
const validator = require('../../middelwares/validatormiddelwaer')



exports.getsubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid subcategory id") , 
    validator,
];


exports.createsubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage("name required")
    .isLength({min:1})
    .withMessage("the name is too short")
    .isLength({max:30})
    .withMessage("the name is too Long"),

    check('category')
    .notEmpty()
    .withMessage("must be belong to category"),

    validator,
];


exports.deletesubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid subcategory id") , 
    validator,
];

exports.updategetsubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid subcategory id") , 
    validator,
];
