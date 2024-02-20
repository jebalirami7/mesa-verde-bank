const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash,
        role: "client",
        cin: req.body.cin,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was an error while trying to create user",
          });
        });
    }
  });
};

exports.current = (req, res, next) => {
    try {
        res.status(200).json({
            message: "User found",
            user: {
              username: req.user.username,
              role: req.user.role,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "There was an error while trying to get user",
        });
    }
};

exports.login = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              role: user[0].role,
              cin: user[0].cin,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            message: "Auth success",
            token: token,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    });
};


exports.deleteAllUsers = (req, res, next ) => {
  User.deleteMany({}).exec().then( doc => {
      res.status(200).json({
          message: 'Tous les utilisateurs sont supprimées',
      });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
          error: 'Une erreur a survenu pendant la suppression des utilisateurs',
      });
  })
};