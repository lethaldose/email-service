const server = require('./server');
const log = require('./log');

process.on('uncaughtException', function (err) {
  log.error('Uncaught exception, shutting down the server');
  log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', function (err) {
  log.error('UNHANDLED REJECTION', err);
});


const app = server.start();
