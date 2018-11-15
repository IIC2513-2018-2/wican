const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');
const override = require('koa-override-method');
const assets = require('./assets');
const mailer = require('./mailers');
const routes = require('./routes');
const apiRoutes = require('./routes/api');
const orm = require('./models');

// App constructor
const app = new Koa();

const developmentMode = app.env === 'development';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// webpack middleware for dev mode only
if (developmentMode) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const koaWebpack = require('koa-webpack');
  koaWebpack()
    .then(middleware => app.use(middleware))
    .catch(console.error); // eslint-disable-line no-console
}

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));

// expose a session hash to store information across requests from same client
app.use(session({
  maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
}, app));

// flash messages support
app.use(koaFlashMessage);

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});

// Configure EJS views
app.use(assets(developmentMode));
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

mailer(app);


app.use(async (ctx, next) => {
  try {
    // let's try to execute the middleware stack
    await next();
  } catch (error) {
    // if there is an error, we capture it to check if we want to have a specific handling
    let viewToRender;
    if (error.name === 'ForbiddenError') {
      viewToRender = 'errors/403';
    }
    // if we are going to handle this, we'll need to still emit the error (app.emit)
    // so other things depending on that from the default handler can still use this error event
    if (viewToRender) {
      app.emit('error', error);
      await ctx.render(viewToRender, error);
    } else {
      // if we won't handle it, then we can throw it so it gets caught by the default error handler
      throw error;
    }
  }
});

// Routing middleware
app.use(apiRoutes.routes());
// Routing middleware
app.use(routes.routes());

module.exports = app;
