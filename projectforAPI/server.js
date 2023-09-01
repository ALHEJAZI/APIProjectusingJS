const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const CategoryRoute = require('./routes/categoryRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middelwares/errormiddelware');
dotenv.config({path:'config.env'});


//Connect with DB 
dbConnection();

//express App
const app = express(); 

//MiddleWares

app.use(express.json());

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}
else{
    console.log(`mode : ${process.env.NODE_ENV}`);
}


//Routes
app.use("/api/v1/categories",CategoryRoute);

app.all('*' , (_req , _res , next)=>{
    next(new ApiError(`Can not find this route ${_req.originalUrl}` , 500))
});


//Global error handling middelware
app.use(globalError);

//Port
const PORT = process.env.PORT || 8000;
const server =  app.listen(PORT,()=>{
    console.log(`APP Runnig on PORT ${PORT}`);
});    


//Handle Rejection out side express

process.on("unhandledRejection" , (err)=>{
    console.error(`Unhandled Rejection Error:${err.name} | ${err.message} `);
    server.close(()=>{
        console.log('shutting down')
        process.exit(1);
    });
});