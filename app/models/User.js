var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    UserModel;

var UserSchema = new Schema({
    username: 'String',
    password: 'String'
});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

UserModel = mongoose.model('User', UserSchema);
