const KoaRouter = require('koa-router');

const index = require('./routes/index');
const hello = require('./routes/hello');
const users = require('./routes/users');
const ngos = require('./routes/ngos');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    ngosPath: ctx.router.url('ngos'),
    newSessionPath: ctx.router.url('session-new'),
  });
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/users', users.routes());
router.use('/ngos', ngos.routes());
router.use('/session', session.routes());

module.exports = router;
