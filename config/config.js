var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mercurious-server'
    },
    port: 3000,
    db: 'mongodb://localhost/mercurious-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mercurious-server'
    },
    port: 3000,
    db: 'mongodb://localhost/mercurious-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mercurious-server'
    },
    port: 3000,
    db: 'mongodb://localhost/mercurious-server-production'
  }
};

module.exports = config[env];
