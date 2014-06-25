'use strict';

var githubService = require('../services/githubFeed'),
    constants = require('../../config/constants');

exports.incomingWebhook = function (req, res) {
    var newRecord,
        requestBody = req.body,
        githubEvent = req.headers[constants.GITHUB.EVENT_HEADER];

    if (githubEvent === constants.GITHUB.EVENTS.PUSH) {
        newRecord = {
          publishedDate: new Date().getTime(),
          githubBody: requestBody
        };

        githubService.addRecord(newRecord);
    }

    res.send();
};
