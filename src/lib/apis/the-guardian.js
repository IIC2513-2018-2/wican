const request = require('superagent');

const { THE_GUARDIAN_API_HOST, THE_GUARDIAN_API_KEY } = process.env;

module.exports = {
  async search(keywords) {
    const response = await request.get(`${THE_GUARDIAN_API_HOST}/search`).query({
      q: keywords,
      'api-key': THE_GUARDIAN_API_KEY,
    });
    return response.body.response.results
      .map(article => ({ title: article.webTitle, url: article.webUrl }));
  },
};
