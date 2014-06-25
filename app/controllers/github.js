'use strict';

var githubService = require('../services/githubFeed'),
    constants = require('../../config/constants');

exports.incomingWebhook = function (req, res) {
    var newRecord, numOfCommits,
        requestBody = req.body,
        githubEvent = req.headers[constants.GITHUB.EVENT_HEADER];

    if (githubEvent === constants.GITHUB.EVENTS.PUSH) {

        numOfCommits = requestBody.commits.length;

        newRecord = {
          title: numOfCommits + ' commits have been pushed to ' + requestBody.repository.name,
          type: 'github',
          url: requestBody.compare,
          text: requestBody.pusher.name + ' pushed ' + numOfCommits + ' commits to ' +
              requestBody.ref.replace('refs/heads/',''),
          publishedDate: new Date().getTime(),
          githubBody: requestBody
        };

        githubService.addRecord(newRecord);
    }

    res.send();
};
