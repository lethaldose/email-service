const config = {
  name: 'email-service',
  port: process.env.PORT || 3000,
  fromEmail: 'support@example-email-service.com',
  sendGrid: {
    hostname: 'https://api.sendgrid.com',
    apiPath: 'https://api.sendgrid.com/v3/mail/send',
    // apiKey:'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'
    // apiKey: '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'
    apiKey:
      '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'
  }
};

module.exports = config;
