"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "userId" });
      User.hasMany(models.Favorite, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already taken",
        },
        validate: {
          notNull: {
            msg: "Email Required",
          },
          notEmpty: {
            msg: "Email Required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Required",
          },
          notEmpty: {
            msg: "Password Required",
          },
          len: {
            args: 8,
            msg: "Password minimum 8 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hash(user.password);
  });
  return User;
};
