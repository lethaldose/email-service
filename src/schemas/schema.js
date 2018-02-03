const s = require('strummer');

const EMAIL_REQUEST = s({
  to: 'email',
  bcc: s.optional(['email']),
  cc: s.optional(['email']),
  subject: s.string({ min: 1 }),
  body: s.string({ min: 1 })
});

module.exports = {
  EMAIL_REQUEST
};
