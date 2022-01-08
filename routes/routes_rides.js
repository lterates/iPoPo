const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_rides');

router.route('/').get(function (req, res) {
    if(req.body.email && req.body.email != '') {
       controller.listByEmail(req, res);
       console.log("GET RIDES BY EMAIL")
    } else if (req.body.id && req.body.id != '') {
        controller.findById(req, res);
        console.log("GET RIDES BY ID")
    } else {
       controller.listAll(req, res); 
       console.log("GET ALL RIDES")
    }
}).post([
    body('price').notEmpty().isNumeric(),
    body('start_point').notEmpty().escape(),
    body('end_point').notEmpty().escape(),
    body('start_time').notEmpty().isNumeric(),
    body('start_day').optional(),
    body('ride_status').notEmpty().escape(),
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
        console.log("DELETED RIDE")
    }
})

module.exports = router; 