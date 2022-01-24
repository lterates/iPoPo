const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

const usersModel = require('./users.model');
const User = usersModel.User;

class PaymentMethod extends Model {}

PaymentMethod.init({
    card_number: DataTypes.INTEGER,
    cvv: DataTypes.INTEGER,
    expiration: DataTypes.STRING
}, { sequelize, modelName: 'paymentMethod'})

PaymentMethod.belongsTo(User)

sequelize.sync().then().catch(error => {
    console.log("ERROR: " + error + " SYNC PAYMENT_METHOD MODELS"); 
})

exports.PaymentMethod = PaymentMethod;