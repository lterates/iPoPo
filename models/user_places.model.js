const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class User_Places extends Model {}

User_Places.init({
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
}, { sequelize, modelName: 'users_places'})

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USERS PLACES MODELS"); 
})

exports.User_Places = User_Places;