const modelFavPlaces = require('../models/fav_places.model');
const modelUserPlaces = require('../models/user_places.model');
const FavPlaces = modelFavPlaces.FavPlaces;
const UserPlaces = modelUserPlaces.User_Places;

//GET PLACE -- GET
const getPlaceById = (req, res) => {
    FavPlaces.findAll({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        if (result == "") {
            res.status(200).json({
                message: `There's no place with id:${req.params.id} in the database.`
            })
            return;
        }
        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    })
}

//ADD NEW FAVORITE PLACE -- POST
const addNewPlace = (req, res) => {
    console.log(req.loggedUser)
    FavPlaces.create({
        place_name: req.body.place_name,
        place_adress: req.body.place_adress
    }).then((result) => {
        UserPlaces.create({
            userId: req.loggedUserId,
            favPlaceId: result.id
        })
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).send('' + error);
    })
}

//EDIT FAVORITE PLACE -- PUT
const editPlace = (req, res) => {
    FavPlaces.update({
        place_name: req.body.place_name,
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.status(200).json({
            message: "Place updated with success!"
        })
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    });
}

//DELETE FAVORITE PLACE -- DELETE
const deletePlace = (req, res) => {
    FavPlaces.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        if (result == 0) {
            res.status(200).json({
                message: `There's no place with id:${req.params.id} found in the database!`
            })
            return;
        }
        UserPlaces.destroy({
            where: {
                userId: req.loggedUserId,
                favPlaceId: req.params.id
            }
        })
        res.status(200).json({
            message: "Place deleted with success!"
        });
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    })
}

exports.getPlaceById = getPlaceById;
exports.addNewPlace = addNewPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;