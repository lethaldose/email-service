'use strict';

const s = require('strummer');
const InvalidSchemaError = require('../errors/invalid-schema-error');

const hasErrors = (object, matcher) => {
  if (matcher) {
    return matcher.match(object);
  }
};

exports.validate = (schemaOptions = {}) => {
  let bodyMatcher = schemaOptions.body ? s(schemaOptions.body) : null;
  let paramsMatcher = schemaOptions.params ? s(schemaOptions.params) : null;

  return function(req, res, next) {
    let errorFields =
      hasErrors(req.params, paramsMatcher) || hasErrors(req.body, bodyMatcher);

    if (errorFields.length > 0) {
      return next(new InvalidSchemaError(errorFields));
    }

    return next();
  };
};
