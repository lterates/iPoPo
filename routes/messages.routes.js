const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const controller = require('../controllers/messages.controller');
const authController = require('../controllers/auth.controller');

/**
 * @route GET /messages
 * @group Messages
 * @returns {object} 200 - An array of all the users messages
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/').get(function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        authController.verifyToken(req, res);
        if (req.loggedUserId != null) {
            controller.getUsersMessages(req, res);
        }
    } else {
        res.status(400).send('Error: ' + errors)
    }
});

/**
 * @route Post /messages/{receiverId}
 * @group Messages
 * @param {integer} receiverId.path - User the message is going to be sent
 * @param {object} object.body - Message - eg. {"content": "Bom dia!"} 
 * @returns {object} 200 - New Message
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.route('/:receiverId').post([
            body("content").escape(),
            body("photo").optional()
        ],
        function (req, res) {
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                authController.verifyToken(req, res);
                if (req.loggedUserId != null) {
                    controller.sendMessage(req, res);
                }
            } else {
                res.status(400).send(errors)
            }
        })
    /**
     * @route DELETE /messages/{receiverId}
     * @group Messages
     * @param {integer} receiver.id - User the message is going to be sent
     * @param {object} object.body - Message - eg. {"id": "1"} 
     * @returns {object} 200 - Message deleted
     * @returns {Error} 400 - Unexpected error
     * @returns {Error} 401 - Invalid Token
     * @security Bearer
     */
    .delete(function (req, res) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            authController.verifyToken(req, res);
            if (req.loggedUserId != null) {
                controller.deleteMessage(req, res);
            }
        } else {
            res.status(400).send(errors);
        }

    });

module.exports = router;