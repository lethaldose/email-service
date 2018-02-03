const expressRouter = require('express-promise-router');
const { EMAIL_REQUEST } = require('../schemas/schema');
const schemaValidator = require('../middleware/schema-validator');

const router = expressRouter();

router.post(
  '/',
  schemaValidator.validate({ body: EMAIL_REQUEST }),
  (req, res) => {
    return res.status(200).send({});
  }
);

module.exports = router;
