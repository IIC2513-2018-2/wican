const JSONAPISerializer = require('jsonapi-serializer').Serializer;

function apiUrl(ctx, ...params) {
  return `${ctx.origin}${ctx.router.url(...params)}`;
}

module.exports = ctx => new JSONAPISerializer('initiatives', {
  attributes: ['title', 'description', 'image', 'keywords', 'hashtag', 'ngo', 'createdAt'],
  ngo: {
    ref: 'id',
    included: true,
    attributes: ['name', 'logo'],
  },
  topLevelLinks: {
    self: data => (Array.isArray(data)
      ? apiUrl(ctx, 'initiatives', data[0].ngo.id)
      : apiUrl(ctx, 'initiatives-show', data.ngo.id, data.id)),
  },
});
