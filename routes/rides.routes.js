const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const ridesController = require('../controllers/rides.controller');
const authController = require('../controllers/auth.controller');

router.route('/').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.listAvailableRides(req, res);
        }
    }
}).post([
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

router.route('/history').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.listByUser(req, res);
        }
    }
})

router.route('/:rideId').get(function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.findById(req, res);
        }
    }
}).put([
    body('ride_status').notEmpty().escape()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.cancelRide(req, res);
        }
    }
}).post(function(req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            ridesController.joinRide(req, res);
        }
    }
})

module.exports = router;