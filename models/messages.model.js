const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', '6RZre7bEUdsQ6PVz', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class Messages extends Model {}

Messages.init({
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
    content: DataTypes.STRING,
    photo: DataTypes.BLOB

}, { sequelize, modelName: 'messages'})

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC MESSAGES MODELS"); 
})

exports.Messages = Messages;