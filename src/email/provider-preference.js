const _ = require('lodash');
const sendGridProvider = require('./providers/send-grid');
const mailGunProvider = require('./providers/mail-gun');
const log = require('../log');
const config = require('../config');

const defaultPreference = ['mail-gun', 'send-grid'];
const providerMap = {
  'send-grid': sendGridProvider,
  'mail-gun': mailGunProvider
};

let providerPreference = config.provider.preference;
if (_.isEmpty(providerPreference)) {
  providerPreference = defaultPreference;
}

let providerByPref = [
  { name: 'send-grid', provider: sendGridProvider },
  { name: 'mail-gun', provider: mailGunProvider }
];

const updatePreferenceMap = () => {
  providerByPref = _.map(providerPreference, name => {
    return { name, provider: providerMap[name] };
  });
};

const set = providers => {
  providerPreference = providers;
  updatePreferenceMap();
};

const reset = () => {
  providerPreference = defaultPreference;
  updatePreferenceMap();
};

const getProviders = () => providerByPref;

const lower = providerName => {
  log.info(`Lowering provider preference ${providerName}`);

  const index = providerPreference.indexOf(providerName);
  if (index < 0) {
    return;
  }
  providerPreference.splice(index, 1);
  providerPreference.push(providerName);
  updatePreferenceMap();

  log.info(`Updated provider preference to ${providerPreference}`);
};

module.exports = {
  set,
  getProviders,
  lower,
  reset
};
