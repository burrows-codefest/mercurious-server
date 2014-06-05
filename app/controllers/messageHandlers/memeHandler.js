var mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed');

exports.handleMessage = function (data) {
    dbRecord = new FeedModel(data);
	dbRecord.save();
};
