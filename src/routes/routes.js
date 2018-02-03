const expressRouter = require('express-promise-router');
const emailRouter = require('../email/router');

const router = expressRouter();

router.use('/email', emailRouter);

module.exports = router;
