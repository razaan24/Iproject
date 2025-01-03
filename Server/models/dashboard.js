"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dashboard.hasMany(models.Favorite, { foreignKey: "dashboardId" });
      Dashboard.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Dashboard.init(
    {
      icon: DataTypes.STRING,
      name: DataTypes.STRING,
      caption: DataTypes.STRING,
      status: DataTypes.STRING,
      price: DataTypes.INTEGER,
      notionUrl: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "categoryId required",
          },
          notEmpty: {
            msg: "categoryId required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Dashboard",
    }
  );
  return Dashboard;
};
