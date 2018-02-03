const  expressRouter = require('express-promise-router');
const  HttpErrors = require('http-errors');
const  log = require('../log');
const  schema = require('../schemas/schema');

const router = expressRouter();

router.post(
  '/',
  async (req, res) => {
    return res.status(200).send({ });
  }
);

module.exports = router;