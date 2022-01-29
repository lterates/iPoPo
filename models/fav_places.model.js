/**
 * @typedef FavPlaces
 * @property {integer} placeId.required
 * @property {string} place_name.required
 * @property {string} place_adress.required
 */

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND1', 'joaoferr_SIC_21_22_IND1', process.env.DB_PASS, {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})

class FavPlaces extends Model {}

FavPlaces.init({
    place_name: DataTypes.STRING,
    place_adress: DataTypes.STRING
}, {sequelize, modelName: 'fav_places'})

sequelize.sync().then().catch(error => {
    console.log("ERROR:" + error + " SYNC FAV_PLACES MODELS")
})

exports.FavPlaces = FavPlaces;