// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    ArticlesModel;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

ArticlesModel = mongoose.model('Article', ArticleSchema);
