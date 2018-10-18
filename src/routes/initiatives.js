const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('initiativeId', async (id, ctx, next) => {
  const { ngo } = ctx.state;
  const [initiative] = await ngo.getInitiatives({ where: { id } });
  ctx.assert(initiative, 404);
  ctx.state.initiative = initiative;
  return next();
});

router.put('initiatives-sign', '/:initiativeId/sign', async (ctx) => {
  const { initiative, ngo } = ctx.state;
  await initiative.sign(ctx.state.currentUser || ctx.request.body);
  ctx.redirect(ctx.router.url('initiatives-show', ngo.id, initiative.id));
});


router.get('initiatives-show', '/:initiativeId', async (ctx) => {
  const { ngo, initiative } = ctx.state;
  const initiativeSignsCount = await initiative.countSigns();
  return ctx.render('initiatives/show', {
    initiative,
    initiativeSignsCount,
    signPath: ctx.router.url('initiatives-sign', ngo.id, initiative.id),
    ngo,

  });
});

module.exports = router;
