const KoaRouter = require('koa-router');
const createInitiativeSerializer = require('../../serializers/initiative');

const router = new KoaRouter();

router.get('initiatives', '/', async (ctx) => {
  const { ngoId } = ctx.params;
  const initiatives = await ctx.orm.initiative.findAll({ where: { ngoId }, include: 'ngo' });
  ctx.body = createInitiativeSerializer(ctx).serialize(initiatives);
});

router.get('initiatives-show', '/:id', async (ctx) => {
  const { id, ngoId } = ctx.params;
  const initiative = await ctx.orm.initiative.findById(id, { where: { ngoId }, include: 'ngo' });
  ctx.body = createInitiativeSerializer(ctx).serialize(initiative);
});

module.exports = router;
