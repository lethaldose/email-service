const log = require('../log');

module.exports = (err, req, res, next) => {
  if (!err) {
    return next(err);
  }

  log.error('Middleware caught error::', err);

  if (err.message === 'SchemaValidationError') {
    return res.status(400).send(err.fields);
  }

  const body = { message: 'Internal Server Error' };
  return res.status(500).send(body);
};
