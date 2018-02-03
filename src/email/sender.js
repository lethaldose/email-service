const sendGridProvider = require('./providers/send-grid');
const log = require('../log');

class Sender {
  constructor(emailOptions) {
    this.emailOptions = emailOptions;
  }

  async send() {
    try {
      await sendGridProvider.sendEmail(this.emailOptions);
      return true;
    } catch (err) {
      log.error(err);
      throw err;
      // const response = await sendGridProvider.sendEmail(this.emailOptions);
    }
  }
}

module.exports = Sender;
