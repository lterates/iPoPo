const { Sequelize, Model, DataTypes } = require('sequelize'); 
const { User } = require('./model_users');
const { FavPlaces } = require('./model_fav_places');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class User_Places extends Model {}

User_Places.init({}, { sequelize, modelName: 'users_places'})

User_Places.belongsTo(User)
User_Places.belongsTo(FavPlaces)

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USERS PLACES MODELS"); 
})

exports.User_Ride = User_Places;