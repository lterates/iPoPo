const modelUser = require('../models/users.model');
const modelRide = require('../models/rides.model');
const modelUserRides = require('../models/user_rides.model')
const User = modelUser.User;
const Rides = modelRide.Rides;
const UserRides = modelUserRides.User_Ride;

//CREATE RIDE -- POST
const createRide = (req, res) => {
    Rides.create({
        price: req.body.price,
        start_point: req.body.start_point,
        end_point: req.body.end_point,
        start_time: req.body.start_time,
        start_day: req.body.start_day,
        ride_status: "Em espera"
    }).then((result) => {
        UserRides.create({
            userType: "Driver",
            userId: req.loggedUserId,
            rideId: result.id
        })
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error)
    })
}

// EDIT RIDE -- PUT
const cancelRide = (req, res) => {
    Rides.update({
            ride_status: req.body.ride_status
        }, {
            where: {
                id: req.params.rideId
            }
        })
        .then((result) => {
            res.status(200).json({
                message: "Ride canceled with success!"
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || 'Some error ocurred while trying to delete ride.'
            })
        })
};

// LIST BY USER -- GET
const listByUser = (req, res) => {
    Rides.findAll({
        includes: [{
            model: User,
            where: {
                userId: req.loggedUserId,
            }
        }]
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

// LIST BY ID -- GET
const findById = (req, res) => {
    Rides.findOne({
        where: {
            id: req.body.id
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

const listAvailableRides = (req, res) => {
    Rides.findAll({
        where: {
            ride_status: "Em espera"
        }
    }).then((list) => {
        res.status(200).json(list)
    }).catch((error) => {
        res.status(400).send('ERROR: ' + error);
    })
}

const joinRide = async (req, res) => {
    const ride = await Rides.findOne({
        where: {
            id: req.params.rideId,
            ride_status: "Em espera"
        }
    })
    if (ride != null) {
        const userInRide = await UserRides.findOne({
            where: {
                userId: req.loggedUserId,
                rideId: req.params.rideId
            }
        })
        if (userInRide == null) {
            UserRides.create({
                userId: req.loggedUserId,
                rideId: req.params.rideId,
                userType: "Passageiro"
            }).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(400).send(error);
            })
        }
    }
}

exports.createRide = createRide;
exports.cancelRide = cancelRide;
exports.listByUser = listByUser;
exports.findById = findById;
exports.listAvailableRides = listAvailableRides;
exports.joinRide = joinRide;