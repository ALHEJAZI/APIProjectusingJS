/* eslint-disable arrow-body-style */

const senderrorForDev = (err , res)=>{
    return res.status(err.statusCode).json({
        status : err.status,
        error : err,
        Message : err.message,
        stack:err.stack
    });
}

const senderrorForProd = (err , res)=>{
    return res.status(err.statusCode).json({
        status : err.status,
       
        Message : err.message,
       
    });
}

const globalError = (err , _req , _res , next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === 'development'){
        senderrorForDev(err , _res);
    }
    else{
        senderrorForProd(err,_res);
    }

}

module.exports = globalError;