const request = require('supertest');

const server = require(`${global.SRC}/server`);

describe('/email', () => {
  let app;

  before(() => {
    app = server.start();
  });

  after(async () => {
    await app.close();
  });

  describe('POST schema validation', () => {
    it('should return validation errors for required params', done => {
      const errorResponse = [
        {
          path: 'to',
          message: 'should be a valid email address'
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
});
