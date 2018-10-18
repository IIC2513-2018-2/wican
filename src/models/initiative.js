module.exports = (sequelize, DataTypes) => {
  const initiative = sequelize.define('initiative', {
    title: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: {
          msg: 'es requerido',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        isEmpty: {
          msg: 'es requerido',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'debe ser una URL válida',
        },
      },
    },
    keywords: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    hashtag: DataTypes.STRING,
  }, {});

  initiative.associate = function associate(models) {
    initiative.belongsTo(models.ngo);
    initiative.hasMany(models.initiativeSign, { as: 'signs' });
  };

  initiative.prototype.sign = function sign(userOrData) {
    const { initiativeSign, user } = sequelize.models;
    const newInitiativeSign = initiativeSign.build();
    newInitiativeSign.setInitiative(this, { save: false });
    if (userOrData instanceof user) {
      newInitiativeSign.setUser(userOrData, { save: false });
    } else {
      newInitiativeSign.name = userOrData.name;
      newInitiativeSign.email = userOrData.email;
    }
    return newInitiativeSign.save();
  };

  return initiative;
};
