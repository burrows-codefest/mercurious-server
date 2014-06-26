'use strict';

module.exports = {
    options: {
        nospawn: true
    },
    node: {
        files: [
            'app.js',
            'app/**/*.js',
            'config/*.js'
        ],
        tasks: ['develop']
    },
    angular: {
        files: [
            'public/**/*.js'
        ],
        options: {
            livereload: true
        }
    }
};
