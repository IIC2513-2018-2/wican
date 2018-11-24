const _ = require('lodash');
const KoaRouter = require('koa-router');
const initiativesRouter = require('./initiatives');

const router = new KoaRouter();

function apiUrl(ctx, ...params) {
  return `${ctx.origin}${ctx.router.url(...params)}`;
}

router.get('ngos', '/', async (ctx) => {
  const ngos = await ctx.orm.ngo.findAll();
  const ngosJSON = ngos.map(ngo => ({
    ..._.pick(ngo, 'id', 'name', 'email'),
    links: {
      self: apiUrl(ctx, 'ngos-show', ngo.id),
      initiatives: apiUrl(ctx, 'initiatives-show', ngo.id),
    },
  }));
  ctx.body = ngosJSON;
});

router.get('ngos-show', '/:id', async (ctx) => {
  const ngo = await ctx.orm.ngo.findById(ctx.params.id);
  ctx.body = _.pick(ngo, 'id', 'name', 'description', 'logo', 'email', 'website', 'createdAt');
});

router.use('/:ngoId/initiatives', initiativesRouter.routes());

module.exports = router;
