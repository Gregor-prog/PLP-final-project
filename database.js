const mysql = require(`mysql2`);
require(`dotenv`).config();


const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
})

db.getConnection((err, result)=>{
    if(!err){
        console.log(`Database Connected successfully`);
        
    }else(
        console.log(err)
    )
})

module.exports = db