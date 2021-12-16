const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class Rides extends Model {}

Rides.init({
    price: DataTypes.FLOAT, 
    start_point: DataTypes.STRING,
    end_point: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    start_day: DataTypes.BLOB, 
    ride_status: DataTypes.STRING,
}, { sequelize, modelName: 'user'})

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USER MODELS"); 
})

exports.Rides = Rides;