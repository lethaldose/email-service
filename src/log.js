const bunyan = require('bunyan');
const config = require('./config');

const log = bunyan.createLogger({
  name: config.name,
  streams: [
    {
      path: `./${config.name.toLowerCase()}.log`
    }
  ]
});

module.exports = log;
