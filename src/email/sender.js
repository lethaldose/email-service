const providerPreference = require('./provider-preference');
const log = require('../log');

class Sender {
  constructor(emailOptions) {
    this.emailOptions = emailOptions;
  }

  async send() {
    let sendStatus = false;
    for (let provider of providerPreference.getProviders()) {
      try {
        await provider.provider.sendEmail(this.emailOptions);
        sendStatus = true;
      } catch (err) {
        log.error(`Sending Email by Provider failed ${provider.name}`);
        log.error(err);
        sendStatus = false;
        providerPreference.lower(provider.name);
      }

      if (sendStatus) {
        break;
      }
    }

    return sendStatus;
  }
}

module.exports = Sender;
