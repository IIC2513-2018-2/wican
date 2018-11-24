const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const ngosRouter = require('./ngos');
const usersRouter = require('./users');

const router = new KoaRouter({ prefix: '/api' });

router.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true, key: 'jwtdata' }));

router.use('/ngos', ngosRouter.routes());
router.use('/users', usersRouter.routes());

module.exports = router;
