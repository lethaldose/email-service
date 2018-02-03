const sinon = require('sinon');
const sendGridProvider = require(`${global.SRC}/email/providers/send-grid`);
const Sender = require(`${global.SRC}/email/sender`);

describe('Sender', () => {
  beforeEach(() => {
    sinon.stub(sendGridProvider, 'sendEmail');
  });

  afterEach(() => {
    sendGridProvider.sendEmail.restore();
  });

  const emailRequestOptions = {
    to: ['foo@example.com'],
    subject: 'test-email',
    bcc: ['bcc@example.com'],
    cc: ['bcc@example.com'],
    body: 'test email content'
  };

  it('should send an email using sendgrid', async () => {
    sendGridProvider.sendEmail.returns(Promise.resolve());

    const sender = new Sender(emailRequestOptions);
    await sender.send();
    sendGridProvider.sendEmail.should.have.been.calledWith(emailRequestOptions);
  });

  describe('Failure', () => {});
});
