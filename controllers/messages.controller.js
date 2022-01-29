const modelMessages = require('../models/messages.model');
const modelUsers = require('../models/users.model');
const Message = modelMessages.Messages;
const Users = modelUsers.User;

//GET MESSAGES FROM USER
const getUsersMessages = (req, res) => {
    Message.findAll({
        where: {
            sender: req.loggedUserId
        }
    }).then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).send('Error: ' + error);
    })
}

//SEND MESSSAGE
const sendMessage = (req, res) => {
    Message.create({
        sender: req.loggedUserId,
        receiver: req.params.receiverId,
        content: req.body.content,
        photo: req.body.photo
    }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error)
    })
}

// DELETE MESSAGE
const deleteMessage = (req, res) => {
    Message.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(num => {
            if (num == 0) {
                res.status(200).json({
                    message: `No Message with id: ${req.body.id} was found on the database.`
                });
                return;
            }
            res.status(200).json({
                message: "Message deleted with success."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while trying to delete message.'
            })
        })
};

exports.getUsersMessages = getUsersMessages;
exports.sendMessage = sendMessage;
exports.deleteMessage = deleteMessage;