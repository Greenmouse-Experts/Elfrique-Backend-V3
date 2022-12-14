"use strict";
const { Model } = require("sequelize");
const {nanoid} = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class questionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questionOption.belongsTo(models.question);
      questionOption.belongsTo(models.trivia, {
        foreignKey: "triviaId",
        as: "trivia",
      });
    }
  }
  questionOption.init(
    {
      id: {
        type: DataTypes.STRING(10),
        autoincrement: false,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => nanoid(10)
    },
      option: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "questionOption",
    }
  );
  return questionOption;
};
