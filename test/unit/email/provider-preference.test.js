const providerPref = require(`${global.SRC}/email/provider-preference`);
const _ = require('lodash');

describe('ProviderPreference', () => {
  it('should set provider preference', () => {
    providerPref.set(['send-grid', 'mail-gun']);
    const providers = providerPref.getProviders();
    providers.should.have.length(2);
    _.map(providers, 'name').should.eql(['send-grid', 'mail-gun']);
  });

  it('should lower provider preference', () => {
    providerPref.set(['send-grid', 'mail-gun']);
    providerPref.lower('send-grid');
    const providers = providerPref.getProviders();
    _.map(providers, 'name').should.eql(['mail-gun', 'send-grid']);
  });

  it('should give default preference', () => {
    providerPref.reset();
    const providers = providerPref.getProviders();
    _.map(providers, 'name').should.eql(['mail-gun', 'send-grid']);
  });
});
