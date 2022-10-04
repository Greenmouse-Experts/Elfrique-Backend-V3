"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class voting_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      voting_detail.belongsTo(models.organiser, {
        foreignKey: { name: "organisers_id" },
      });
      voting_detail.hasMany(models.contestants, {
        foreignKey: { name: "voting_details_id" },
      });
      // voting_detail.hasMany(models.contestInfo);
      // voting_detail.hasMany(models.sponsors);
      // voting_detail.hasMany(models.contestVote);
    }
  }
  voting_detail.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      identification_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      organisers_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      date_added: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      starting_date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      closing_date: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      starting_time: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      closing_time: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      result_percentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      result_numbers: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      cash_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      ddaily_limit_setting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "daily_limit_setting",
      },
      daily_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      view_contestant_profile_setting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      payment_gateway: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "paystack",
      },
      airtime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      organiser_profile_display: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      background_image: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      backgroundSetting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "background_setting",
      },
      show_graph: {
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
      packaged_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      amount_packages: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      disabled: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      roqqu_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      aimtoget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "voting_detail",
    }
  );
  return voting_detail;
};
