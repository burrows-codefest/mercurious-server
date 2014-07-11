'use strict';

module.exports = {
    GITHUB: {
        ACTIONS: {
          OPEN: 'opened',
          CLOSE: 'closed'
        },
        EVENTS: {
            PUSH: 'push',
            PULL_REQUEST: 'pull_request',
            ISSUE_COMMENT: 'issue_comment',
            PULL_REQUEST_COMMENT: 'pull_request_review_comment'
        },
        EVENT_HEADER: 'x-github-event'
    },
    MODEL: {
        FEED: 'Feed',
        GITHUB: 'github',
        USER: 'User'
    },
    PATH: {
        ADMIN: '/admin',
        LOGIN: '/signin'
    },
    SOCKET: {
        DEFAULT_CHANNEL: 'mercurious',
        GITHUB_ALL_PR: 'githubAllPullRequest',
        GITHUB_NEW_PR: 'githubNewPullRequest',
        GITHUB_UPDATED_PR: 'githubUpdatedPullRequest',
        ERROR: 'error',
        MESSAGE: 'message',
        NEW_ITEM: 'new item',
        PING: 'ping',
        PING_RETURN: 'pong'

    },
    TEMPLATE: {
        INDEX: 'home/index',
        LOGIN: 'home/login',
        REGISTER: 'home/register',
        USER: 'home/user'
    },
    TIMER: {
        MINUTES_15: (1000 * 60 * 15)
    }
};