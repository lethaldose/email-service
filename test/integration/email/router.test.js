const nock = require('nock');
const request = require('supertest');
const config = require(`${global.SRC}/config`).get().mailGun;
const server = require(`${global.SRC}/server`);

describe('/email', () => {
  let app;

  before(() => {
    app = server.start();
  });

  after(async () => {
    await app.close();
  });

  describe('schema validation', () => {
    it('should return validation errors for required params', done => {
      const errorResponse = [
        {
          path: 'to',
          message: 'should be an array'
        },
        {
          path: 'subject',
          message: 'should be a string'
        },
        {
          path: 'body',
          message: 'should be a string'
        }
      ];

      request(app)
        .post('/email')
        .send({})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.eql(errorResponse);
          done();
        });
    });
  });

  describe('send email ', () => {
    beforeEach(() => {
      nock(config.hostname)
        .post('/messages')
        .reply(202, { success: 'true' });
    });

    it('should send email', done => {
      const emailParams = {
        to: ['foo@example.com'],
        subject: 'test-email',
        bcc: ['bcc@example.com'],
        cc: ['cc@example.com'],
        body: 'test email content'
      };

      request(app)
        .post('/email')
        .send(emailParams)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.should.eql({ sent: true });
          done();
        });
    });
  });
});
