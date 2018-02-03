const config = {
  name: 'email-service',
  port: process.env.PORT || 3000,
  fromEmail: 'support@example-email-service.com',
  sendGrid: {
    hostname: 'https://api.sendgrid.com',
    apiPath: 'https://api.sendgrid.com/v3/mail/send',
    apiKey: ''
  }
};

module.exports = config;
