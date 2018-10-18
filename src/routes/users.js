const KoaRouter = require('koa-router');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');
const sendWelcomeEmail = require('../mailers/welcome');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const user = await ctx.orm.user.findById(ctx.params.id);
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.get('users-new', '/new', ctx => ctx.render(
  'users/new',
  {
    user: ctx.orm.user.build(),
    submitPath: ctx.router.url('users-create'),
  },
));

router.post('users-create', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password'] });
    sendWelcomeEmail(ctx, { user });
    ctx.flashMessage.notice = 'Cuenta registrada exitosamente';
    ctx.redirect('/');
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('users/new', {
      user,
      errors: getFirstErrors(error),
      submitPath: ctx.router.url('users-create'),
    });
  }
});

module.exports = router;
