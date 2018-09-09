module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'es requerido',
        },
        len: {
          args: [2],
          msg: 'debe tener al menos 2 caracteres',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'es requerido',
        },
        len: {
          args: [2],
          msg: 'debe tener al menos 2 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'es requerido',
        },
        isEmail: {
          msg: 'debe tener formato de e-mail',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'es requerido',
        },
        len: {
          args: [6],
          msg: 'debe tener al menos 6 caracteres',
        },
        securePassword(value) {
          if (!/[a-z]/.test(value)) throw new Error('Debe tener al menos una minúscula');
          if (!/[A-Z]/.test(value)) throw new Error('Debe tener al menos una mayúscula');
          if (!/[0-9]/.test(value)) throw new Error('Debe tener al menos un número');
        },
      },
    },
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  });

  return user;
};
