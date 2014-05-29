var env = process.env.NODE_ENV,
    spawn = require('child_process').spawn;

if (env === 'production') {
    var spawnProcess = spawn('bower install');

    spawnProcess.on('close', function () {
        process.exit(0);
    });
}
