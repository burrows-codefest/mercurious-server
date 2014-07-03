'use strict';

module.exports = {
    'default': [
        'develop',
        'watch'
    ],

    'test-server-unit': [
        'jshint',
        'mocha-chai-sinon:unit'
    ],

    'test-front-unit': [
        'jshint',
        'karma'
    ],

    'test': [
        'sass',
        'jshint',
        'karma',
        'mocha-chai-sinon:unit'
    ]
};


