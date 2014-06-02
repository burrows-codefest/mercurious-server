var mongoose = require('mongoose'),
    crypto = require('crypto'),
    UserModel = mongoose.model('User');

function encryptPassword(password) {
    return crypto.createHash('sha1').update(password).digest('hex').toString('base64');
}

exports.authenticate = function (username, password, callback) {
    UserModel.find()
        .where('username').equals(username)
        .where('password').equals(encryptPassword(password))
        .exec(function (err, results) {
            if(results.length === 1) {
                callback(true);
            }
                callback(false);
        });
};