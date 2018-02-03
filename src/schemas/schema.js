const s = require('strummer');

const EMAIL_REQUEST = s({
  to: 'email',
  bcc: s.optional(['email']),
  cc: s.optional(['email']),
  subject: 'string',
  body: 'string',
});

module.exports = {
  EMAIL_REQUEST
}