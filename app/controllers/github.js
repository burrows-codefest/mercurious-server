'use strict';

var githubService = require('../services/githubFeed'),
    constants = require('../../config/constants');

exports.incomingWebhook = function (req, res) {
    var newRecord,
        requestBody = req.body,
        githubEvent = req.headers[constants.GITHUB.EVENT_HEADER];

    if (githubEvent === constants.GITHUB.EVENTS.PULL_REQUEST) {
        if (requestBody.action === constants.GITHUB.ACTIONS.OPEN) {
            newRecord = {
                id: requestBody.pull_request.id,
                issueNumber: requestBody.number,
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
    } else if (githubEvent === constants.GITHUB.EVENTS.ISSUE_COMMENT ||
        githubEvent === constants.GITHUB.EVENTS.PULL_REQUEST_COMMENT) {
        var comment = {
            id: requestBody.comment.id,
            url: requestBody.comment.html_url,
            body: requestBody.comment.body,
            publishedDate: new Date(requestBody.comment.created_at),
            repositoryId: requestBody.repository.id
        };

        if (requestBody.issue) {
            comment.issueNumber = requestBody.issue.number;
            comment.publishUserId = requestBody.issue.user.id;
            comment.publishedUserName = requestBody.issue.user.login;
        } else {
            comment.issueNumber = requestBody.pull_request.number;
            comment.publishUserId = requestBody.comment.user.id;
            comment.publishedUserName = requestBody.comment.user.login;
        }

        githubService.addComment(comment);
    }

    res.send();
};

exports.getAllRequests = function (socket) {
    githubService.getAllRecords(function (results) {
        socket.emit(constants.SOCKET.GITHUB_ALL_PR, results);
    });
};
