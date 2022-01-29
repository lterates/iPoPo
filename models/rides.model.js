/**
 * @typedef Ride
 * @property {integer} rideId.required
 * @property {float} price.required
 * @property {string} start_point.required
 * @property {string} end_point.required
 * @property {string} start_time.required
 * @property {string} start_day.required
 * @property {string} ride_status.required
 */


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
    start_time: DataTypes.STRING,
    start_day: DataTypes.STRING, 
    ride_status: DataTypes.STRING,
}, { sequelize, modelName: 'rides'})

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC RIDES MODELS"); 
})

exports.Rides = Rides;