'use strict';

module.exports = {
    options: {
        nospawn: true,
        livereload: reloadPort
    },
    js: {
        files: [
            'app.js',
            'app/**/*.js',
            'config/*.js',
            'public/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
    }
};
