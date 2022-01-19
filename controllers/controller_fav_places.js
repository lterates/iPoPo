const modelUser = require('../models/model_users');
const modelFavPlaces = require('../models/model_fav_places');
const User = modelUser.User;
const FavPlaces = modelFavPlaces.FavPlaces;

//ADD NEW FAVORITE PLACE -- POST
const addNewPlace = (req, res) => {
    FavPlaces.create({
        place_name: req.body.place_name,
        place_cords: req.body.place_cords
    }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    })
}

//EDIT FAAVORITE PLACE -- PUT
const editPlace = (req, res) => {
    FavPlaces.update({
        place_name: req.body.place_name,
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.status(200).json(result)
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
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    })
}

exports.addNewPlace = addNewPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;