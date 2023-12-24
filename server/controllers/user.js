const mongoose = require('mongoose');
const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next ) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message : err
            })
        }
        else {
            const user = new User( {
                _id: new mongoose.Types.ObjectId(),
                username : req.body.username,
                password : hash,
            });
            user.save().then( result => {
                res.status(201).json({
                    message : 'User created',
                });
            })
            .catch( err => {
                res.status(500).json({
                    message : 'There was an error while trying to create user',
                }); 
            })
        }
    });



};



exports.login = (req, res, next) => {
    User.find({ username : req.body.username}).exec().then(
        user => {
            if (user.length < 1 ) {
                return res.status(401).json({
                    message : "Auth failed",
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message : "Auth failed",
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        username : user[0].username,
                    }, process.env.JWT_KEY, {
                        expiresIn : "2h",
                    })
                    return res.status(200).json({
                        message : "Auth success",
                        token : token,
                    });
                }


                res.status(401).json({
                    message : "Auth failed",
                });
            })
        }
    )
}