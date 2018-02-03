const expressRouter = require('express-promise-router');
const { EMAIL_REQUEST } = require('../schemas/schema');
const schemaValidator = require('../middleware/schema-validator');
const Sender = require('./sender');

const router = expressRouter();

router.post(
  '/',
  schemaValidator.validate({ body: EMAIL_REQUEST }),
  async (req, res) => {
    const sender = new Sender(req.body);
    await sender.send();
    return res.status(200).send({ sent: true });
  }
);

module.exports = router;
