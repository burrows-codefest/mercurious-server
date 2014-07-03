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
    } else if (githubEvent === constants.GITHUB.EVENTS.ISSUE_COMMENT) {
        githubService.addComment({
            id: requestBody.comment.id,
            issueNumber: requestBody.issue.number,
            url: requestBody.comment.html_url,
            body: requestBody.comment.body,
            publishUserId: requestBody.issue.user.id,
            publishedUserName: requestBody.issue.user.login,
            publishedDate: new Date(requestBody.comment.created_at),
            repositoryId: requestBody.repository.id
        });
    } else if(githubEvent === constants.GITHUB.EVENTS.PULL_REQUEST_COMMENT) {
        githubService.addComment({
            id: requestBody.comment.id,
            issueNumber: requestBody.pull_request.number,
            url: requestBody.comment.html_url,
            body: requestBody.comment.body,
            publishUserId: requestBody.comment.user.id,
            publishedUserName: requestBody.comment.user.login,
            publishedDate: new Date(requestBody.comment.created_at),
            repositoryId: requestBody.repository.id
        });
    }
    res.send();
};

exports.getAllRequests = function (socket) {
    githubService.getAllRecords(function (results) {
        socket.emit(constants.SOCKET.GITHUB_ALL_PR, results);
    });
};
