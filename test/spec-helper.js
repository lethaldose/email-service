const sinon = require('sinon');
const chai = require('chai');
require('should-sinon');

const stubPromise = require('sinon-stub-promise');
stubPromise(sinon);
global.expect = chai.expect;
process.env.NODE_ENV = 'test';
global.SRC = `${__dirname}/../src`;
