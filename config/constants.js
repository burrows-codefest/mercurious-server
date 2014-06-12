'use strict';

module.exports = {
    GITHUB: {
        EVENTS: {
            PUSH: 'push'
        },
        EVENT_HEADER: 'x-github-event'
    },
    MODEL: {
        FEED: 'Feed',
        USER: 'User'
    },
    SOCKET: {
        ERROR: 'error',
        MESSAGE: 'message',
        NEW_ITEM: 'new item'

    },
    TEMPLATE: {
        INDEX: 'home/index',
        LOGIN: 'home/login',
        USER: 'home/user'
    },
    TIMER: {
        MINUTES_15: (1000 * 60 * 15)
    }
};