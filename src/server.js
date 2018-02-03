'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');
const errorHandler = require('./middleware/error-handler');
const log = require('./log');
const routes = require('./routes');

const start = () => {
  const app = express();

  app.use(bodyParser.json({ limit: '200kb' }));
  app.get('/', (req, res) => {
    res.send({"EmailService": "Hello"});
  });

  app.get('/health-check', (req, res) => {
    res.send({ status: 'ok' });
  });

  app.use('/', routes);
  app.use(errorHandler);
  app.listen(config.port, () => {
    log.info(`Email Service Started:: listening at ${config.port}`);
  });
  return app;
};

module.exports = {
  start
}