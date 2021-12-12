const Model = require('../models/model_messages'); 
const Message = Model.User; 

//SEND MESSSAGE
const sendMessage = (req, res) => { 
    Message.create({
        sender: req.body.sender,
        receiver: req.body.receiver,
        content: req.body.content,
        photo: req.body.photo,
        time_sent: req.body.time_sent,
        time_received: req.body.time_received,
        is_read: req.body.is_read,
        is_deleted: req.body.is_deleted 
    }).then((result) => {
        res.status(200).json(result); 
    }).catch((error) =>{
        res.status(400).send('ERROR: ' + error)
    })
}

// DELETE MESSAGE
const deleteMessage = async (req, res) => {
    let message = await Message.findAll({
        where: {
            id: req.body.id
        }
    })
    if (message) {
        Message.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(num => {
                if (num == 0) {
                    res.status(200).json({
                        message: `No Message with id: ${req.params.id} was found on the database.`
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
    } else {
        res.status(200).json({
            message: `No Message with id: ${req.params.id} was found on the database.`
        });
    }
};

exports.sendMessage = sendMessage;
exports.deleteMessage = deleteMessage;