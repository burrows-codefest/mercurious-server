var env = process.env.NODE_ENV,
    spawn = require('child_process').spawn;

if (env === 'production') {
    var spawnProcess = spawn('./node_modules/bower/bin/bower install');

    spawnProcess.stderr.on('data', function(data) {
        console.log('something went wrong installing deps for ' + path + '.  Error: ', data);
    });

    spawnProcess.on('close', function () {
        process.exit(0);
    });
}

