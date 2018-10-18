const KoaRouter = require('koa-router');
const users = require('./users');

const router = new KoaRouter();

/**
 * Middleware to check if the current user is an Admin or throw a 403 error
 */
function checkAdmin(ctx, next) {
  ctx.assert(ctx.state.currentUser && ctx.state.currentUser.isAdmin, 403);
  return next();
}

router.use(checkAdmin);

router.use('/users', users.routes());

module.exports = router;
