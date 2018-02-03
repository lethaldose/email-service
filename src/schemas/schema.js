const s = require('strummer');

const EMAIL_REQUEST = s({
  to: s.array({ min: 1, max: 10, of: 'email' }),
  bcc: s.optional(s.array({ min: 1, max: 10, of: 'email' })),
  cc: s.optional(s.array({ min: 1, max: 10, of: 'email' })),
  subject: s.string({ min: 1 }),
  body: s.string({ min: 1 })
});

module.exports = {
  EMAIL_REQUEST
};
