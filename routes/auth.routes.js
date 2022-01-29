const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const controller = require('../controllers/auth.controller');

/**
 * @route POST /auth/signIn
 * @group Authentication
 * @param {object} object.body - User's Credentials - eg. {"email": "maria@gmail.com", "password": "12345"}
 * @returns {object} 200 - An object of the logged user with the token
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 */
router.route('/signIn').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        controller.signIn(req, res);
    } else {
        res.status(400).send(error);
    }
})

/**
 * @route POST /auth/signUp
 * @group Authentication
 * @param {object} object.body - User's Credentials - eg. {"email": "maria@gmail.com", "username": "maria123", "password": "12345", "firsName": "Maria", "lastName": "Teixeira", "college": "ESE"}
 * @returns {object} 200 - A message confirmation that the user was created
 * @returns {Error} 400 - Unexpected error
 */
router.route('/signUp').post([
    body("username").notEmpty().escape(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().escape(),
    body("phoneNumber").isNumeric().optional(),
    body("photo").optional(),
    body("firstName").optional().escape(),
    body("lastName").optional().escape(),
    body("description").optional().escape(),
    body("birthDay").escape().optional(),
    body("college").notEmpty().escape()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        controller.signUp(req, res);
    } else {
        res.status(400).send(error);
    }
})

module.exports = router;