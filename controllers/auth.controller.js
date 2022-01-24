const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

//*CALL USERS TABLE
const usersModel = require('../models/users.model');
const Users = usersModel.User;

const signIn = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({
            message: "User Not found."
        });
        const passwordIsValid = await bcrypt.compareSync(
            req.body.password, user.password.toString()
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({
                id: user.id
            },
            config.secret, {
                expiresIn: 86400
            });

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            college: user.college,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

const signUp = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.params.email
            }
        });
        if (user) {
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        }
        user = await Users.create({
            username: req.params.username,
            email: req.params.email,
            password: bcrypt.hashSync(req.params.password, 8),
            phoneNumber: req.params.phoneNumber,
            photo: req.params.photo,
            firstName: req.params.firstName,
            lastName: req.params.lastName,
            description: req.params.description,
            birthDay: req.params.birthDay,
            college: req.params.college
        });
        return res.status(200).json({
            message: "User was registered successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

const verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.loggedUserId = decoded.id;
        return req.loggedUserId
    });
};

exports.signIn = signIn;
exports.signUp = signUp;
exports.verifyToken = verifyToken;