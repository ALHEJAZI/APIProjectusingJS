const { mongoose } = require("mongoose");

    //connect with DB
const dbConnection = ()=>{

mongoose.connect(process.env.DB_URI).then((conn)=>{
    console.log(`DB connected ${conn.connection.host}`)
}).catch((err)=>{
    console.error(`DB error ${err}`);
    process.exit(1);
});
};

module.exports = dbConnection;