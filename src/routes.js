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
    destroySessionPath: ctx.router.url('session-destroy'),
  });
  return next();
});

/**
 * Middleware to provide "current user" (if available) to every other route middleware
 */
router.use(async (ctx, next) => {
  if (ctx.session.currentUserId) {
    ctx.state.currentUser = await ctx.orm.user.findById(ctx.session.currentUserId);
  }
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/users', users.routes());
router.use('/ngos', ngos.routes());
router.use('/session', session.routes());

module.exports = router;
