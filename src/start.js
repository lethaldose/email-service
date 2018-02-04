const server = require('./server');
const log = require('./log');
const config = require('./config');

process.on('uncaughtException', function(err) {
  log.error('Uncaught exception, shutting down the server');
  log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', function(err) {
  log.error('UNHANDLED REJECTION', err);
});

if (!config.validate()) {
  log.error(
    'Error:: Please set environment variables MAIL_GUN_API_KEY and SEND_GRID_API_KEY'
  );
  process.exit(1);
}

log.info('Starting Email Service');
server.start();
