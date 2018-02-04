const rp = require('request-promise');
const _ = require('lodash');
const log = require('../../log');
const config = require('../../config');
const emailConfig = config.mailGun;

const createRequest = emailPayload => {
  const authHeader = Buffer.from(
    `${emailConfig.username}:${emailConfig.apiKey}`
  ).toString('base64');
  const options = {
    method: 'POST',
    url: emailConfig.apiPath,
    headers: {
      authorization: `Basic ${authHeader}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: emailPayload
  };
  return options;
};

createEmailPayload = ({ to, bcc, cc, subject, body }) => {
  const toEmails = _.join(to, ',');
  let ccEmails = _.join(cc, ',');
  let bccEmails = _.join(bcc, ',');

  const payload = {
    from: config.fromEmail,
    subject: subject,
    text: body
  };

  if (!_.isEmpty(toEmails)) {
    payload.to = toEmails;
  }
  if (!_.isEmpty(ccEmails)) {
    payload.cc = ccEmails;
  }
  if (!_.isEmpty(bccEmails)) {
    payload.bcc = bccEmails;
  }

  return payload;
};

const sendEmail = async emailOptions => {
  log.info('MailGun: Sending email for:', emailOptions);

  try {
    const emailPayload = createEmailPayload(emailOptions);
    const emailReq = createRequest(emailPayload);
    const response = await rp(emailReq);
    return response;
  } catch (err) {
    log.error('MailGun: Error sending MailGun Email', emailOptions);
    throw err; // can wrap in custom Email error
  }
};

module.exports = {
  sendEmail
};
