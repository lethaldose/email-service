const _ = require('lodash');
const sinon = require('sinon');
const sendGridProvider = require(`${global.SRC}/email/providers/send-grid`);
const mailGunProvider = require(`${global.SRC}/email/providers/mail-gun`);
const Sender = require(`${global.SRC}/email/sender`);
const providerPreference = require(`${global.SRC}/email/provider-preference`);

describe('Sender', () => {
  beforeEach(() => {
    sinon.stub(sendGridProvider, 'sendEmail');
    sinon.stub(mailGunProvider, 'sendEmail');
    providerPreference.set(['send-grid', 'mail-gun']);
  });

  afterEach(() => {
    sendGridProvider.sendEmail.restore();
    mailGunProvider.sendEmail.restore();
  });

  const emailRequestOptions = {
    to: ['foo@example.com'],
    subject: 'test-email',
    bcc: ['bcc@example.com'],
    cc: ['bcc@example.com'],
    body: 'test email content'
  };

  it('should send an email using provider', async () => {
    sendGridProvider.sendEmail.returns(Promise.resolve());
    const sender = new Sender(emailRequestOptions);
    const sendStatus = await sender.send();
    sendStatus.should.be.true();
    sendGridProvider.sendEmail.should.have.been.calledWith(emailRequestOptions);
  });

  describe('Failure', () => {
    it('should send an email using mail-gun provider on failure', async () => {
      sendGridProvider.sendEmail.returns(Promise.reject());
      mailGunProvider.sendEmail.returns(Promise.resolve());

      const sender = new Sender(emailRequestOptions);
      const sendStatus = await sender.send();
      sendStatus.should.be.true();
      sendGridProvider.sendEmail.should.have.been.calledWith(
        emailRequestOptions
      );
      mailGunProvider.sendEmail.should.have.been.calledWith(
        emailRequestOptions
      );
    });

    it('should lower provider preference on failure', async () => {
      sendGridProvider.sendEmail.returns(Promise.reject());
      mailGunProvider.sendEmail.returns(Promise.resolve());

      const sender = new Sender(emailRequestOptions);
      const sendStatus = await sender.send();
      sendStatus.should.be.true();

      const providers = providerPreference.getProviders();
      _.map(providers, 'name').should.eql(['mail-gun', 'send-grid']);
    });

    it('should return false on failure', async () => {
      sendGridProvider.sendEmail.returns(Promise.reject());
      mailGunProvider.sendEmail.returns(Promise.reject());

      const sender = new Sender(emailRequestOptions);
      const sendStatus = await sender.send();
      sendStatus.should.be.false();
    });
  });
});
