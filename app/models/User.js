var mongoose = require('mongoose'),
    constants = require('../../config/constants'),
    Schema = mongoose.Schema,
    UserModel;

var UserSchema = new Schema({
    username: 'String',
    password: 'String'
});

UserSchema.virtual('date')
    .get(function () {
        return this._id.getTimestamp();
    });

UserModel = mongoose.model(constants.MODEL.USER, UserSchema);
