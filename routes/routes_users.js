const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_users'); 

router.route('/').get(function (req, res) {
    if(req.body.email && req.body.email != '') {
       controller.listByEmail(req, res);
       console.log("GET USER BY EMAIL")
    } else if (req.body.id && req.body.id != '') {
        controller.findById(req, res);
        console.log("GET USER BY ID")
    } else {
       controller.listAll(req, res); 
       console.log("GET ALL USERS")
    }
}).post([
    body('email').notEmpty().isEmail(),
    body('nome').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('phoneNumber').notEmpty().isNumeric(),
    body('photo').optional(),
    body('firstName').notEmpty().escape(),
    body('lastName').notEmpty().escape(),
    body('description').notEmpty().escape(),
    body('birthDay').isDate().optional(),
    body('rating').isNumeric(),
    body('history').escape(),
],function(req, res) { 
    const errors = validationResult(req); 
    if(errors.isEmpty()) {
       controller.create(req, res); 
    } else {
        res.status(400).send(errors); 
    }
}).delete(function(req, res) { 
    if(req.body.id && req.body.id != '') {
        controller.deleteUser(req, res);
        console.log("DELETED USER")
    }
})

module.exports = router; 