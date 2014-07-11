'use strict';

var express = require('express'),
    cookie = require('express/node_modules/cookie'),
    expressUtils = require('express/node_modules/connect/lib/utils'),
    sessionStore = new express.session.MemoryStore();

module.exports = function (app, socks, config) {
    app.configure(function () {
        app.use(express.compress())
            .use(express.static(config.root + '/public'))
            .set('port', config.port)
            .set('views', config.root + '/app/views')
            .set('view engine', 'ejs')
            .use(express.logger('dev'))
            .use(express.bodyParser())
            .use(express.methodOverride())
            .use(express.cookieParser())
            .use(express.session({secret: 'mercurious', store: sessionStore}))
            .use(app.router)
            .use(function (req, res) {
                res.status(404).render('404', { title: '404' });
            });
    });

    socks.set('authorization', function (handshakeData, accept) {
        var sessionCookie, sessionID,
            cookieName = 'connect.sid';

        if (handshakeData.headers.cookie) {
            sessionCookie = cookie.parse(handshakeData.headers.cookie);
            sessionID = expressUtils.parseSignedCookie(sessionCookie[cookieName], 'mercurious');

            if (sessionCookie[cookieName] !== sessionID) {
                sessionStore.load(sessionID, function (err, session) {
                    handshakeData.session = session;

                    if(session && session.user) {
                        accept(null, true);
                    } else {
                        accept('No Auth.', false);
                    }
                });
            } else {
                accept('Cookie is invalid.', false);
            }

        } else {
            accept('No cookie transmitted.', false);
        }
    });
};
