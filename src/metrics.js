const metrics = {
  sent: 0,
  fail: 0
};

const incrementSentSuccess = () => {
  metrics.sent += 1;
};

const incrementSendFail = () => {
  metrics.fail += 1;
};

const get = () => {
  return { email: metrics };
};

module.exports = {
  get,
  incrementSentSuccess,
  incrementSendFail
};
