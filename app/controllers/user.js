'use strict';

var crypto = require('crypto'),
    constants = require('../../config/constants'),
    UserModel = require('../models/User');

function encryptPassword(password) {
    return crypto.createHash('sha1').update(password).digest('hex').toString('base64');
}

exports.loginPage = function (req, res) {
    res.render(constants.TEMPLATE.LOGIN);
};

exports.registerPage = function (req, res) {
    if (req.session.user) {
        res.redirect(constants.PATH.ADMIN);
    } else {
        res.render(constants.TEMPLATE.REGISTER, {'username': req.body.username});
    }
};

exports.registerSubmit = function (req, res) {
    UserModel.find()
        .where('username').equals(req.body.username)
        .exec(function (err, results) {
            if (results.length === 1) {
                res.render(constants.TEMPLATE.REGISTER, {'username': req.body.username});
            } else {
                var record = new UserModel(
                    {username: req.body.username, password: encryptPassword(req.body.password)}
                );

                record.save();

                req.session.user = true;
                res.redirect(constants.PATH.ADMIN);
            }
        });
};

exports.authenticate = function (req, res) {
    UserModel.find()
        .where('username').equals(req.body.username)
        .where('password').equals(encryptPassword(req.body.password))
        .exec(function (err, results) {
            if (results.length === 1) {
                req.session.user = true;
                res.redirect(constants.PATH.ADMIN);
            } else {
                res.redirect(constants.PATH.LOGIN);
            }
        });
};

exports.isUserAuth = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.statusCode = 401;
        res.send();
    }
};