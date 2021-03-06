/**
 * @typedef User
 * @property {integer} userId.required
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {integer} phoneNumber
 * @property {blob} photo
 * @property {string} firstName.required
 * @property {string} lastName.required
 * @property {string} description
 * @property {date} birthday
 * @property {string} college.required
 * @property {integer} rating
 * @property {float} score
 */

const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class User extends Model {}

User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    photo: DataTypes.BLOB,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    college: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
}, { sequelize, modelName: 'user'})

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC USER MODELS"); 
})

exports.User = User;