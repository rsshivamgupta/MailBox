// const Sequelize=require('sequelize')


// module.exports=new Sequelize(
//     process.env.DATABASE_NAME,
//     'root',
//     process.env.DATABASE_password,
//     {
//         dialect:'mysql',
//         host:process.env.DATABASE_HOST
//     }
// )





const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
    }
);
