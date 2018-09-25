const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session-new', '/new', ctx => ctx.render(
  'session/new',
  {
    submitPath: ctx.router.url('session-create'),
  },
));

router.put('session-create', '/', async (ctx) => {

});

module.exports = router;
