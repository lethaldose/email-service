const HTTPErrors = require('http-custom-errors');
const util = require('util');

function EmailError(fields) {
  this.message = 'EmailError';
  this.fields = fields;
  this.statusCode = 500;
}

util.inherits(EmailError, HTTPErrors.InternalServerError);

module.exports = EmailError;
