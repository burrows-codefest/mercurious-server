'use strict';

var constants = require('../../config/constants');

exports.index = function (req, res) {
    if (req.session.user) {
        res.render(constants.TEMPLATE.USER);
    } else {
        res.render(constants.TEMPLATE.LOGIN);
    }
};