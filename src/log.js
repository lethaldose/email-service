const bunyan = require('bunyan');
const config = require('./config').get();

const log = bunyan.createLogger({
  name: config.name,
  streams: [
    {
      path: `./${config.name.toLowerCase()}.log`
    }
  ]
});

module.exports = log;
