'use strict';

var githubService = require('../services/githubFeed'),
    constants = require('../../config/constants');

exports.incomingWebhook = function (req, res) {
    var newRecord,
        requestBody = req.body,
        githubEvent = req.headers[constants.GITHUB.EVENT_HEADER];

    if (githubEvent === constants.GITHUB.EVENTS.PULL_REQUEST) {
        if(requestBody.action === constants.GITHUB.ACTIONS.OPEN) {
            newRecord = {
                id: requestBody.pull_request.id,
                title: requestBody.pull_request.title,
                body: requestBody.pull_request.body,
                status: requestBody.action,
                url: requestBody.pull_request.html_url,
                publishUserId: requestBody.pull_request.user.id,
                publishedUserName: requestBody.pull_request.user.login,
                publishedDate: new Date(requestBody.pull_request.created_at),
                repositoryId: requestBody.repository.id,
                repositoryName: requestBody.repository.name,
                githubBody: requestBody
            };

            githubService.addRecord(newRecord);
        } else if (requestBody.action === constants.GITHUB.ACTIONS.CLOSE) {
            githubService.updateRecord({
                id: requestBody.pull_request.id,
                status: requestBody.action,
                closedDate: new Date(requestBody.pull_request.closed_at)
            });
        }
    }

    res.send();
};

exports.getLatestRequests = function () {

};
