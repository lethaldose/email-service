const _ = require('lodash');

const config = {
  name: 'email-service',
  port: process.env.PORT || 3000,
  fromEmail: 'support@example-email-service.com',
  provider: {
    preference: ['mail-gun', 'send-grid']
  },
  sendGrid: {
    hostname: 'https://api.sendgrid.com',
    apiPath: 'https://api.sendgrid.com/v3/mail/send',
    apiKey: process.env.SEND_GRID_API_KEY
  },
  mailGun: {
    username: 'api',
    apiKey: process.env.MAIL_GUN_API_KEY,
    hostname:
      'https://api.mailgun.net/v3/sandbox14d841222ca04bf59b8f5f00b5353c89.mailgun.org',
    apiPath:
      'https://api.mailgun.net/v3/sandbox14d841222ca04bf59b8f5f00b5353c89.mailgun.org/messages'
  }
};

const get = () => config;

const validate = () => {
  if (
    _.isEmpty(process.env.MAIL_GUN_API_KEY) ||
    _.isEmpty(process.env.SEND_GRID_API_KEY)
  ) {
    return false;
  }
  return true;
};

module.exports = {
  get,
  validate
};
