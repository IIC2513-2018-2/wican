const bcrypt = require('bcrypt');

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
      unique: {
        msg: 'ya está en uso por otro usuario',
      },
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    hooks: {
      async beforeSave(instance) {
        if (instance.changed('password')) {
          instance.set('password', await bcrypt.hash(instance.password, 10));
        }
      },
    },
  });

  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return user;
};
