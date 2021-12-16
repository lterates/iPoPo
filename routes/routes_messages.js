const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/controller_messages'); 

router.route('/:receiverId').post([
    body('sender').notEmpty().isNumeric(),
    body('receiver').notEmpty().isNumeric(),
    body('content').escape(),
    body('photo').escape()
],function(req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controller.sendMessage(req, res);
    } else {
        res.status(400).send(errors)
    }
}).delete(function(req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        if (req.body.id && req.body.id != '') {
            controller.deleteMessage(req, res);
            console.log("DELETE MESSAGE");
        }
    } else {
        res.status(400).send(errors);
    }
    
});

module.exports = router; 