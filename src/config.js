const config = {
  name: 'email-service',
  port: process.env.PORT || 3000,
  fromEmail: 'support@example-email-service.com',
  sendGrid: {
    hostname: 'https://api.sendgrid.com',
    apiPath: 'https://api.sendgrid.com/v3/mail/send',
    apiKey: ''
  },
  mailGun: {
    username: 'api',
    apiKey: '',
    hostname:
      'https://api.mailgun.net/v3/sandbox14d841222ca04bf59b8f5f00b5353c89.mailgun.org',
    apiPath:
      'https://api.mailgun.net/v3/sandbox14d841222ca04bf59b8f5f00b5353c89.mailgun.org/messages'
  }
};

module.exports = config;
