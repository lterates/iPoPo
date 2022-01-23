const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const controller = require('../controllers/auth.controller');

router.route('/signIn').post([
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ],
    function (req, res) {
        const error = validationResult(req);
        if (error.isEmpty()) {
            controller.signIn(req, res);
        } else {
            res.status(400).send(error);
        }
    })

router.route('/signUp').post([
    body("username").notEmpty().escape(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().escape(),
    body("phoneNumber").isNumeric().optional(),
    body("photo").optional(),
    body("firstName").optional().escape(),
    body("lastName").optional().escape(),
    body("description").optional().escape(),
    body("birthDay").isDate().optional()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        controller.signUp(req, res);
    } else {
        res.status(400).send(error);
    }
})

module.exports = router;