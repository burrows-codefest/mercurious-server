var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.index = function(req, res){
  Article.find(function(err, articles){
      console.log(article);
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};
