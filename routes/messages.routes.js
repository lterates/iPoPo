const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const controller = require('../controllers/messages.controller'); 

router.route('/').get(function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getUsersMessages(req, res);
    } else {
        res.status(400).send('Error: ' + errors)
    }
});

router.route('/:receiverId').post([
    body("sender").notEmpty().isNumeric(),
    body("content").escape(),
    body("photo").optional()
],
    function(req, res) {
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