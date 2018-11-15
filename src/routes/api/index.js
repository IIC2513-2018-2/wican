const KoaRouter = require('koa-router');
const ngosRouter = require('./ngos');

const router = new KoaRouter({ prefix: '/api' });

router.use('/ngos', ngosRouter.routes());

module.exports = router;
