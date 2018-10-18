module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('initiatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      keywords: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hashtag: {
        type: Sequelize.STRING,
      },
      ngoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ngos',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('initiatives');
  },
};
