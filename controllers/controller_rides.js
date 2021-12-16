const modelUser = require('../models/model_users'); 
const modelRide = require('../models/model_rides');
const User = modelUser.User; 
const Rides = modelRide.Rides; 

//CREATE RIDE -- POST
const create = (req, res) => { 
    Rides.create({
        price: req.body.price,
        start_point: req.body.start_point,
        end_point: req.body.end_point,
        start_time: req.body.start_time,
        start_day: req.body.start_day,
        ride_status: req.body.ride_status,
    }).then((result) => {
        res.status(200).json(result); 
    }).catch((error) =>{
        res.status(400).send('ERROR: ' + error)
    })
}

// EDIT RIDE -- PUT
const editRides = async (req, res) => {
    let user = await Rides.findAll({
        where: {
            id: req.body.id
        }
    })
    if (user) {
        User.update({
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

// LIST BY USER -- GET
const listByUser = (req, res) => {
    Rides.findAll({
        includes: [
            {
                model: User, 
                where: {
                    id: req.body.id,
                }
            }
        ]
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error)=> { 
        res.status(400).send('ERROR: ' + error); 
    })
}

// LIST BY ID -- GET
const findById = (req, res) => {
    Rides.findAll({
        where: {
            id: req.body.id
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

// LIST ALL -- GET
const listAll = (req, res) => {
   Rides.findAll().then((list) => {
       res.status(200).json(list)
   }).catch((error)=> {
       console.log(error)
       res.status(400).send('ERROR: ' + error); 
   })
}

exports.create = create;
exports.editRides = editRides;
exports.listByUser = listByUser; 
exports.listAll = listAll; 
exports.findById = findById;