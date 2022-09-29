"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class event_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  event_category.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      categoryName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "category_name",
      },
      dateAdded: {
        type: DataTypes.STRING(225),
        allowNull: true,
        field: "date_added",
      },
    },
    {
      sequelize,
      modelName: "event_category",
    }
  );
  return event_category;
};
