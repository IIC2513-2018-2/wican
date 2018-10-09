const KoaRouter = require('koa-router');
const users = require('./users');

const router = new KoaRouter();

router.use('/users', users.routes());

module.exports = router;
