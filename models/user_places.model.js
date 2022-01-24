const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

const usersModel = require('./users.model');
const favPlacesModel = require('./fav_places.model');
const User = usersModel.User;
const FavPlaces = favPlacesModel.FavPlaces;

class User_Places extends Model {}

User_Places.init({}, { sequelize, modelName: 'users_places'})

User_Places.belongsTo(User);
User_Places.belongsTo(FavPlaces);

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USERS PLACES MODELS"); 
})

exports.User_Places = User_Places;