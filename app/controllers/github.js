var githubService = require('../services/githubFeed');

exports.incomingWebhook = function (req, res) {
    var newRecord, numOfCommits,
        requestBody = req.body,
        githubEvent = req.headers['x-github-event'];

    if (githubEvent === 'push') {

        numOfCommits = requestBody.commits.length;

        newRecord = {
          title: numOfCommits + ' commits have been pushed to ' + requestBody.repository.name,
          type: 'github',
          url: requestBody.compare,
          text: requestBody.pusher.name + ' pushed ' + numOfCommits + ' commits to ' + requestBody.ref.replace('refs/heads/',''),
          publishedDate: new Date().getTime(),
          gibhubBody: requestBody
        };

        githubService.addRecord(newRecord);
    }

    res.send();
};