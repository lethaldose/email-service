const expressRouter = require('express-promise-router');
const { EMAIL_REQUEST } = require('../schemas/schema');
const schemaValidator = require('../middleware/schema-validator');
const Sender = require('./sender');
const metrics = require('../metrics');

const router = expressRouter();

router.post(
  '/',
  schemaValidator.validate({ body: EMAIL_REQUEST }),
  async (req, res) => {
    const sender = new Sender(req.body);
    const sendStatus = await sender.send();
    if (sendStatus) {
      metrics.incrementSentSuccess();
      return res.status(200).send({ sent: true });
    } else {
      metrics.incrementSentFail();
      return res.status(500).send({ sent: false });
    }
  }
);

module.exports = router;
