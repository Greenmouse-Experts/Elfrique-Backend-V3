"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // referral.belongsTo(models.organiser);
    }
  }
  referral.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      referral_id: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "referral",
    }
  );
  return referral;
};
