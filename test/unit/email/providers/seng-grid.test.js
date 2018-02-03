const nock = require('nock');
const config = require(`${global.SRC}/config`).sendGrid;
const sendGridProvider = require(`${global.SRC}/email/providers/send-grid`);

describe('SendGrid Provider', () => {
  const emailRequestOptions = {
    to: ['foo@example.com'],
    subject: 'test-email',
    bcc: ['bcc@example.com'],
    cc: ['bcc@example.com'],
    body: 'test email content'
  };

  const emailRequest = {
    personalizations: [
      {
        to: [{ email: 'foo@example.com' }],
        cc: [{ email: 'bcc@example.com' }],
        bcc: [{ email: 'bcc@example.com' }],
        subject: 'test-email'
      }
    ],
    from: { email: 'support@example-email-service.com', name: 'Support' },
    content: [{ type: 'text/plain', value: 'test email content' }]
  };

  it('should send an email with correct request options', async () => {
    nock(config.hostname)
      .post('/v3/mail/send', req => {
        req.should.eql(emailRequest);
        return true;
      })
      .reply(202, { success: 'true' });

    response = await sendGridProvider.sendEmail(emailRequestOptions);
    response.should.eql({ success: 'true' });
  });

  it('should throw an error if request fails', done => {
    nock(config.hostname)
      .post('/v3/mail/send')
      .reply(400, { success: 'false' });

    sendGridProvider.sendEmail(emailRequestOptions).catch(err => {
      err.statusCode.should.eql(400);
      err.error.should.eql({ success: 'false' });
      done();
    });
  });
});
