const rp = require('request-promise');
const _ = require('lodash');
const log = require('../../log');
const config = require('../../config');
const emailConfig = config.sendGrid;

const createRequest = emailPayload => {
  const options = {
    method: 'POST',
    uri: emailConfig.apiPath,
    headers: {
      authorization: emailConfig.apiKey,
      'content-type': 'application/json'
    },
    json: true,
    body: emailPayload
  };

  return options;
};

const createEmailPayload = ({ to, bcc, cc, subject, body }) => {
  const toEmails = _.map(to, emailAdd => ({ email: emailAdd }));
  const ccEmails = _.map(cc, emailAdd => ({ email: emailAdd }));
  const bccEmails = _.map(bcc, emailAdd => ({ email: emailAdd }));

  const payload = {
    personalizations: [
      {
        to: toEmails,
        cc: ccEmails,
        bcc: bccEmails,
        subject: subject
      }
    ],
    from: { email: config.fromEmail, name: 'Support' },
    content: [
      {
        type: 'text/plain',
        value: body
      }
    ]
  };

  return payload;
};

const sendEmail = async emailOptions => {
  log.info('Sendgrid: Sending email for:', emailOptions);

  try {
    const emailPayload = createEmailPayload(emailOptions);
    const emailReq = createRequest(emailPayload);
    const response = await rp(emailReq);
    return response;
  } catch (err) {
    log.error('SendGrid: Error sending SendGrid Email', emailOptions);
    log.error(err);
    throw err; // can wrap in custom Email error
  }
};

module.exports = {
  sendEmail
};
