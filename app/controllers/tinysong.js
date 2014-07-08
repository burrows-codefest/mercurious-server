'use strict';
var http = require('http'),
    constants = require('../../config/constants');

function removeApiUrl(url) {
    return url.replace('/api/song/', '');
}

exports.search = function (req, res) {
    var url = 'http://tinysong.com/s/' + removeApiUrl(req.url) + '&key=' + constants.TINYSONG.API_KEY;

    http.get(url, function(tinysongResponse) {
        var data = '';

        tinysongResponse.setEncoding('utf8');

        tinysongResponse.on('data', function (chunk) {
            data += chunk;
        });

        tinysongResponse.on('end', function () {
            res.json(JSON.parse(data));
        });
    });

};
