var mongoose = require('mongoose'),
    crypto = require('crypto'),
    UserModel = mongoose.model('User');

function encryptPassword(password) {
    return crypto.createHash('sha1').update(password).digest('hex').toString('base64');
}

exports.loginPage = function (req, res) {
    res.render('home/login');
};

exports.authenticate = function (req, res) {
    UserModel.find()
        .where('username').equals(req.body.username)
        .where('password').equals(encryptPassword(req.body.password))
        .exec(function (err, results) {
            if (results.length === 1) {
                req.session.user = true;
                res.redirect('/admin');
            } else {
                res.redirect('/signin');
            }
        });
};