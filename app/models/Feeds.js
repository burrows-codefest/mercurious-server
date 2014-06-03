var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FeedsModel;

var FeedSchema = new Schema({
    title: String,
    type: String,
    url: String,
    text: String,
    twitterId: String,
    publishedDate: String,
    gibhubBody: Object
});

FeedSchema.virtual('date')
    .get(function () {
        return this._id.getTimestamp();
    });

FeedsModel = mongoose.model('Feed', FeedSchema);
