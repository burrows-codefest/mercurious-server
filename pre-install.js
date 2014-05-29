var env = process.env.NODE_ENV,
    spawn = require('child_process').spawn;

if (env === 'production') {
    var spawnProcess = spawn('npm install -g bower');

    spawnProcess.on('close', function () {
        process.exit(0);
    });
}
