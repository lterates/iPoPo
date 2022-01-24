const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const usersController = require('../controllers/users.controller');
const favPlacesController = require('../controllers/fav_places.controller');
const authController = require('../controllers/auth.controller');

router.route('/').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res)
        if (req.loggedUserId != null) {
            usersController.getLoggedUser(req, res)
        }
    }
}).put([
    body("username").optional().escape(),
    body("email").optional().isEmail(),
    body("password").optional().escape(),
    body("phoneNumber").isNumeric().optional(),
    body("photo").optional(),
    body("firstName").optional().escape(),
    body("lastName").optional().escape(),
    body("description").optional().escape(),
    body("birthDay").isDate().optional(),
    body("college").optional().escape()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            usersController.updateUser(req, res)
        }
    }
})

router.route('/places').post([
    body('place_name').notEmpty(),
    body('place_adress').notEmpty()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            favPlacesController.addNewPlace(req, res)
        }
    } else {
        res.status(400).send(error);
    }
})

router.route('/places/:id').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            favPlacesController.getPlaceById(req, res)
        }
    } else {
        res.status(400).send(error);
    }
}).delete(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            favPlacesController.deletePlace(req, res);
        }
    } else {
        res.status(400).send(error);
    }
}).put(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            favPlacesController.editPlace(req, res);
        }
    } else {
        res.status(400).send(error);
    }
})

module.exports = router;