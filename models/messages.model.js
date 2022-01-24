const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', '6RZre7bEUdsQ6PVz', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

const usersModel = require('./users.model');
const User = usersModel.User;

class Messages extends Model {}

Messages.init({
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
    content: DataTypes.STRING,
    photo: DataTypes.BLOB
}, { sequelize, modelName: 'messages'})

Messages.belongsTo(User, {foreignKey: "sender"});
Messages.belongsTo(User, {foreignKey: "receiver"});

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC MESSAGES MODELS"); 
})

exports.Messages = Messages;