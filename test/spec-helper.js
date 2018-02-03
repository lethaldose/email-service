const sinon = require('sinon');
require('should-sinon');
const stubPromise = require('sinon-stub-promise');
stubPromise(sinon);

process.env.NODE_ENV = 'test';

global.SRC = `${__dirname}/../src`;
