const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');
const CategoryRoute = require('./routes/categoryRoute');
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


//Routes
app.use("/api/v1/categories",CategoryRoute);


//Port
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`APP Runnig on PORT ${PORT}`);
});    