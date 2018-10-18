const KoaRouter = require('koa-router');
const initiatives = require('./initiatives');
const cloudStorage = require('../lib/cloud-storage');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const ngo = await ctx.orm.ngo.findById(id);
  ctx.assert(ngo, 404);
  ctx.state.ngo = ngo;
  return next();
});

router.get('ngos', '/', async (ctx) => {
  const ngos = await ctx.orm.ngo.findAll();
  return ctx.render('ngos/index', {
    ngos,
    getShowPath: ngo => ctx.router.url('ngos-show', ngo.id),
    getNgoLogoPath: ngo => ctx.router.url('ngos-show-logo', ngo.id),
  });
});

router.get('ngos-new', '/new', async ctx => ctx.render('ngos/new', {
  submitPath: ctx.router.url('ngos-create'),
  ngo: ctx.orm.ngo.build(),
}));

router.post('ngos-create', '/', async (ctx) => {
  const ngo = await ctx.orm.ngo.create(ctx.request.body);
  const { path: localLogoPath, name: localLogoName } = ctx.request.files.logo;
  const remoteLogoPath = cloudStorage.buildRemotePath(localLogoName, { directoryPath: 'ngos/logos', namePrefix: ngo.id });
  await cloudStorage.upload(localLogoPath, remoteLogoPath);
  await ngo.update({ logo: remoteLogoPath });
  ctx.flashMessage.notice = 'ONG creada exitosamente';
  ctx.redirect(ctx.router.url('ngos'));
});

router.get('ngos-show', '/:id', async (ctx) => {
  const { ngo } = ctx.state;
  return ctx.render('ngos/show', {
    ngo,
    initiatives: await ngo.getInitiatives(),
    buildInitiativePath: initiative => ctx.router.url('initiatives-show', ngo.id, initiative.id),
  });
});

router.get('ngos-show-logo', '/:id/logo', async (ctx) => {
  const { logo } = ctx.state.ngo;
  if (/^https?:\/\//.test(logo)) {
    ctx.redirect(logo);
  } else {
    ctx.body = cloudStorage.download(logo);
  }
});

router.use('/:id/initiatives', initiatives.routes());

module.exports = router;
