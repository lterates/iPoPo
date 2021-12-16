const { Sequelize, Model, DataTypes } = require('sequelize'); 
const { User } = require('./model_messages');
const { Rides } = require('./model_rides');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class User_Ride extends Model {}

User_Ride.init({
   userType: DataTypes.STRING
}, { sequelize, modelName: 'users_ride'})

User_Ride.belongsTo(User)
User_Ride.belongsTo(Rides)

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USERS RIDES MODELS"); 
})

exports.User_Ride = User_Ride;