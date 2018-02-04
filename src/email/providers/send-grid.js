const rp = require('request-promise');
const _ = require('lodash');
const log = require('../../log');
const config = require('../../config').get();
const emailConfig = () => config.sendGrid;

const createRequest = emailPayload => {
  const options = {
    method: 'POST',
    uri: emailConfig().apiPath,
    headers: {
      authorization: `Bearer ${emailConfig().apiKey}`,
      'content-type': 'application/json'
    },
    json: true,
    body: emailPayload
  };

  return options;
};

const createEmailPayload = ({ to, bcc, cc, subject, body }) => {
  const toEmails = _.map(to, emailAdd => ({ email: emailAdd }));
  let ccEmails = _.map(cc, emailAdd => ({ email: emailAdd }));
  let bccEmails = _.map(bcc, emailAdd => ({ email: emailAdd }));
  if (_.isEmpty(ccEmails)) {
    ccEmails = null;
  }
  if (_.isEmpty(bccEmails)) {
    bccEmails = null;
  }

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
    throw err; // can wrap in custom Email error
  }
};

module.exports = {
  sendEmail
};
