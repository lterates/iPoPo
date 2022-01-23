const { Sequelize, Model, DataTypes } = require('sequelize');

const usersModel = require('./users.model');
const ridesModel = require('./rides.model');
const User = usersModel.User;
const Rides = ridesModel.Rides;

const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})

class User_Ride extends Model {}

User_Ride.init({
    // user_id: DataTypes.INTEGER,
    // ride_id: DataTypes.INTEGER,
    userType: DataTypes.STRING
}, {
    sequelize,
    modelName: 'users_ride'
})

User_Ride.belongsTo(User)
User_Ride.belongsTo(Rides)

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USERS RIDES MODELS");
})

exports.User_Ride = User_Ride;