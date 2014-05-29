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
    port: process.env.PORT,
    db: 'mongodb://MongoLab-xa:T_t1cea7PCIdVAk.m1I78VXax2EcyRM1N4ftFfhH9iQ-@ds031088.mongolab.com:31088/MongoLab-xa'
  }
};

module.exports = config[env];
