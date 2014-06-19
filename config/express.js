var express = require('express');

module.exports = function (app, config) {
    app.configure(function () {
        app.use(express.compress())
            .use(express.static(config.root + '/public'))
            .set('port', config.port)
            .set('views', config.root + '/app/views')
            .set('view engine', 'ejs')
            //.use(express.favicon(config.root + '/public/img/favicon.ico'))
            .use(express.logger('dev'))
            .use(express.bodyParser())
            .use(express.methodOverride())
            .use(express.cookieParser())
            .use(express.session({secret: 'mercurious'}))
            .use(app.router)
            .use(function (req, res) {
                res.status(404).render('404', { title: '404' });
            });
    });
};
