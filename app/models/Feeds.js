var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    FeedsModel;

var FeedSchema = new Schema({
  title: String,
  url: String,
  text: String,
  twitterId: String
});

FeedSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

FeedsModel = mongoose.model('Feed', FeedSchema);
