'use strict';

var constants = require('../../config/constants');

exports.index = function(req, res){
    res.render(constants.TEMPLATE.INDEX);
};
