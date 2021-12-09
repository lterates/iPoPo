const Model = require('../models/model_users'); 
const User = Model.User; 

//CREATE USER
const create = (req, res) => { 
    User.create({
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        photo: req.body.photo,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        description: req.body.description,
        birthday: req.body.birthday,
        rating: req.body.rating,
        history: req.body.history,
    }).then((result) => {
        res.status(200).json(result); 
    }).catch((error) =>{
        res.status(400).send('ERROR: ' + error)
    })
}

// DELETE USER
const deleteUser = async (req, res) => {
    let user = await User.findAll({
        where: {
            id: req.body.id
        }
    })
    if (user) {
        User.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(num => {
                if (num == 0) {
                    res.status(200).json({
                        message: `No User with id: ${req.params.id} was found on the database.`
                    });
                    return;
                }
                res.status(200).json({
                    message: "User deleted with success."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error ocurred while trying to delete user.'
                })
            })
    } else {
        res.status(200).json({
            message: `No User with id: ${req.params.id} was found on the database.`
        });
    }
};

// LIST BY EMAIL
const listByEmail = (req, res) => {
    User.findAll({
        where: {
            email: req.body.email 
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error)=> { 
        res.status(400).send('ERROR: ' + error); 
    })
}

// LIST BY ID
const findById = (req, res) => {
    User.findAll({
        where: {
            id: req.body.id
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

// LIST ALL
const listAll = (req, res) => {
   User.findAll().then((list) => {
       res.status(200).json(list)
   }).catch((error)=> {
       console.log(error)
       res.status(400).send('ERROR: ' + error); 
   })
}

exports.create = create;
exports.deleteUser = deleteUser;
exports.listByEmail = listByEmail; 
exports.listAll = listAll; 
exports.findById = findById;