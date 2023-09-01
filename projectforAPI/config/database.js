const { mongoose } = require("mongoose");

    //connect with DB
const dbConnection = ()=>{

mongoose.connect(process.env.DB_URI).then((conn)=>{
    console.log(`DB connected ${conn.connection.host}`)
});
};

module.exports = dbConnection;