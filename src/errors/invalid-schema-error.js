'use strict';

const HTTPErrors = require('http-custom-errors');
const util = require('util');

function InvalidSchemaError(fields) {
  this.message = 'SchemaValidationError';
  this.fields = fields;
  this.statusCode = 400;
}

util.inherits(InvalidSchemaError, HTTPErrors.BadRequestError);

module.exports = InvalidSchemaError;
