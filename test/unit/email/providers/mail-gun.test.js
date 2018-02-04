const nock = require('nock');
const config = require(`${global.SRC}/config`).mailGun;
const mailGunProvider = require(`${global.SRC}/email/providers/mail-gun`);

describe('MailGun Provider', () => {
  const emailRequestOptions = {
    to: ['foo@example.com', 'bar@example.com'],
    subject: 'test-email',
    bcc: ['bcc@example.com'],
    cc: ['cc@example.com'],
    body: 'test email content'
  };

  const mailGunEmailParams = {
    to: 'foo@example.com,bar@example.com',
    cc: 'cc@example.com',
    bcc: 'bcc@example.com',
    subject: 'test-email',
    from: 'support@example-email-service.com',
    text: 'test email content'
  };

  it('should send an email with correct request options', async () => {
    nock(config.hostname)
      .post('/messages', req => {
        req.should.eql(mailGunEmailParams);
        return true;
      })
      .reply(202, { success: 'true' });

    response = await mailGunProvider.sendEmail(emailRequestOptions);
    response.should.eql(JSON.stringify({ success: 'true' }));
  });

  it('should throw an error if request fails', done => {
    nock(config.hostname)
      .post('/messages')
      .reply(400, { success: 'false' });

    mailGunProvider.sendEmail(emailRequestOptions).catch(err => {
      err.statusCode.should.eql(400);
      err.error.should.eql(JSON.stringify({ success: 'false' }));
      done();
    });
  });
});
