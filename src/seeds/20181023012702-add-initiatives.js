const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  async up(queryInterface) {
    const ngoIds = (await queryInterface.select(null, 'ngos', { attributes: ['id'] }))
      .map(ngo => ngo.id);
    const initiativesBulkInsertPromises = ngoIds.map((ngoId) => {
      const quantity = faker.random.number({ min: 1, max: 20 });
      const initiativesData = [];
      for (let i = 0; i < quantity; i += 1) {
        initiativesData.push({
          ngoId,
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(10),
          image: faker.image.imageUrl(),
          active: Math.random() < 0.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return queryInterface.bulkInsert('initiatives', initiativesData);
    });
    return Promise.all(initiativesBulkInsertPromises);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('initiatives', null, {});
  },
};
