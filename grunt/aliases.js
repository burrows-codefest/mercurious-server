'use strict';

var liveReload,
    grunt,
    request = require('request');

module.exports = function (globalGrunt) {
    grunt = globalGrunt;
    setupAliases();

    return {
        'default': [
            'develop',
            'jshint',
            'watch'
        ],
        'delayed-livereload': liveReload,
        'test': [
            'jshint',
            'karma'
        ]
    }
};

function setupAliases() {
    var files = grunt.config('watch.js.files');

    grunt.config.requires('watch.js.files');
    files = grunt.file.expand(files);

    liveReload = function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
                var reloaded = !err && res.statusCode === 200;
                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    };
}
