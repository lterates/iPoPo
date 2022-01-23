const Model = require('../models/users.model');
const User = Model.User;

//GET LOGGED USER
const getLoggedUser = (req, res) => {
    User.findOne({
        where: {
            id: req.loggedUserId
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

//UPDATE USER
const updateUser = (req, res) => {
    User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        photo: req.body.photo,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        description: req.body.description,
        birthDay: req.body.birthDay
    }, {
        where: {
            id: req.loggedUserId
        }
    }).then((result) => {
        res.status(200).json({
            message: "User updated with success!"
        })
    }).catch((error) => {
        res.status(400).send(error);
    })
}

exports.getLoggedUser = getLoggedUser;
exports.updateUser = updateUser;