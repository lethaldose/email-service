const expressRouter = require('express-promise-router');

const router = expressRouter();

router.post('/', (req, res) => {
  return res.status(200).send({});
});

module.exports = router;
