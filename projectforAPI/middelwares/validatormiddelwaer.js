const { validationResult } = require("express-validator");

const validator = (_req , _res , next)=>{

    const errors = validationResult(_req);
    if(!errors.isEmpty()){
        return _res.status(400).json({errors : errors.array()});
    }
    next();
}

module.exports  = validator;