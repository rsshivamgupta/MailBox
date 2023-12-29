const Sequelize=require('sequelize')


module.exports=new Sequelize(
    process.env.DATABASE_NAME,
    'root',
    process.env.DATABASE_password,
    {
        dialect:'mysql',
        host:process.env.DATABASE_HOST
    }
)