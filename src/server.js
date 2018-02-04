const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config').get();
const errorHandler = require('./middleware/error-handler');
const log = require('./log');
const routes = require('./routes');
const metrics = require('./metrics');

const start = () => {
  const app = express();

  app.use(bodyParser.json({ limit: '200kb' }));
  app.get('/', (req, res) => {
    res.send({ EmailService: 'Hello' });
  });

  app.get('/health-check', (req, res) => {
    res.send({ status: 'ok' });
  });

  app.get('/metrics', (req, res) => {
    res.send(metrics.get());
  });

  app.use('/', routes);
  app.use(errorHandler);
  return app.listen(config.port, () => {
    log.info(`Email Service Started:: listening at ${config.port}`);
  });
};

module.exports = {
  start
};
