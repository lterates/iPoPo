const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const ridesController = require('../controllers/rides.controller');
const authController = require('../controllers/auth.controller');


/**
 * @route GET /rides
 * @group Rides
 * @returns {object} 200 - An array of all the available rides
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.listAvailableRides(req, res);
        }
    }
})
/**
 * @route POST /rides
 * @group Rides
 * @param {object} object.body - Ride - eg. {"price": 4, "start_point": "Porto", "end_point": "ESE", "start_time": "15:00", "start_day": "07-02-2022"}
 * @returns {object} 200 - Create Ride
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.post([
    body('price').notEmpty().isFloat(),
    body('start_point').notEmpty().escape(),
    body('end_point').notEmpty().escape(),
    body('start_time').notEmpty().escape(),
    body('start_day').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.createRide(req, res);
        }
    } else {
        res.status(400).send(errors);
    }
})

/**
 * @route GET /rides/history
 * @group Rides
 * @returns {object} 200 - An array of all the rides the user was in
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/history').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.listByUser(req, res);
        }
    }
})

/**
 * @route GET /rides/{rideId}
 * @group Rides
 * @param {integer} rideId.path - Id of the ride
 * @returns {object} 200 - Object with one path
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/:rideId').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.findById(req, res);
        }
    }
})
/**
 * @route PUT /rides/{rideId}
 * @group Rides
 * @param {integer} rideId.path - Id of the ride
 * @param {object} object.body - Ride - eg. {"ride_status": "Cancelado"}
 * @returns {object} 200 - Ride Updated
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.put([
    body('ride_status').notEmpty().escape()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.cancelRide(req, res);
        }
    }
})
/**
 * @route PUT /rides/{rideId}
 * @group Rides
 * @param {integer} rideId.path - Id of the ride
 * @returns {object} 200 - User joined this ride
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
.post(function(req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.joinRide(req, res);
        }
    }
})

module.exports = router;