const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const usersController = require('../controllers/users.controller');
const favPlacesController = require('../controllers/fav_places.controller');
const authController = require('../controllers/auth.controller');

/**
 * @route GET /users
 * @group Users
 * @returns {object} 200 - Object with Logged User
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res)
        if (req.loggedUserId != null) {
            usersController.getLoggedUser(req, res)
        }
    }
})
/**
 * @route PUT /users
 * @group Users
 * @param {object} object.body - User - eg. {"phoneNumber" 912345678, "description": "Sou simpático!"}
 * @returns {object} 200 - User Updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.put([
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
});

/**
 * @route GET /users/paymentMethod
 * @group Users
 * @returns {object} 200 - Object with user payment method
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/paymentMethod').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            usersController.getPaymentMethod(req, res)
        }
    } else {
        res.status(400).send(error);
    }
})
/**
 * @route POST /users/paymentMethod
 * @group Users
 * @param {object} object.body - Payment - eg. {"card_number": 123456798101112, "cvv": 123, "expiration": "08/22"}
 * @returns {object} 200 - Create a new payment method
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.post([
    body("card_number").isNumeric().notEmpty(),
    body("cvv").isNumeric().notEmpty(),
    body("expiration").escape().notEmpty()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            usersController.addPaymentMethod(req, res)
        }
    } else {
        res.status(400).send(error);
    }
})

/**
 * @route POST /users/places
 * @group Users
 * @param {object} object.body - Place - eg. {"place_name": "ESMAD", "place_adress": "Rua Dom Sancho I"}
 * @returns {object} 200 - Favorite Place created
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
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

/**
 * @route GET /users/place/{id}
 * @group Users
 * @param {integer} id.path - Place Id
 * @returns {object} 200 - Object with one place
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
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
})
/**
 * @route DELETE /users/place/{id}
 * @group Users
 * @param {integer} id.path - Place Id
 * @returns {object} 200 - Place Deleted
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.delete(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            favPlacesController.deletePlace(req, res);
        }
    } else {
        res.status(400).send(error);
    }
})
/**
 * @route PUT /users/place/{id}
 * @group Users
 * @param {integer} id.path - Place Id
 * @param {object} object.body - Place - eg. {"place_name": "Faculdade"}
 * @returns {object} 200 - Update place name
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.put(function (req, res) {
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