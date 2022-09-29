"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class trivia_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trivia_detail.belongsTo(models.organiser);
      // trivia_detail.hasMany(models.question, {
      //   foreignKey: "trivia_detailId",
      //   as: "questions",
      // });
      // trivia_detail.hasMany(models.questionOption, {
      //   foreignKey: "trivia_detailId",
      //   as: "options",
      // });
      // trivia_detail.hasMany(models.trivia_detailplayer, {
      //   foreignKey: "trivia_detailId",
      //   as: "players",
      // });
    }
  }
  trivia_detail.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      identification_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      organiser_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instruction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      date_added: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      show_result: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      show_result_analysis: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      background_image: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      background_setting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      start_date_utc: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      closing_date_utc: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "Africa/Lagos",
      },
      auto_switch: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "free",
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      payment_gateway: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "flutterwave",
      },
      cash_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      airtime_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      disabled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      roqqu_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      times_to_answer: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "1",
      },
      aimtoget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "trivia_detail",
      timestamps: false,
    }
  );
  return trivia_detail;
};
