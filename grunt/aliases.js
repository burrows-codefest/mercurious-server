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

        'test': [
            'jshint',
            'karma'
        ]
};


