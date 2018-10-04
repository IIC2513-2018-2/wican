module.exports = (sequelize, DataTypes) => {
  const ngo = sequelize.define('ngo', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'es requerido',
        },
      },
    },
    description: DataTypes.TEXT,
    logo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'debe ser un e-mail válido',
        },
      },
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'debe ser una URL válida',
        },
      },
    },
  }, {});
  ngo.associate = function associate(models) {
    ngo.hasMany(models.initiative);
  };
  return ngo;
};
