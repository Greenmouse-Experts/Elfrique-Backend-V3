"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class form_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      form_detail.belongsTo(models.organiser);
      // form_detail.hasMany(models.formQuestion);
      // form_detail.hasMany(models.formOption);
    }
  }
  form_detail.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      identificationName: {
        type: DataTypes.STRING(225),
        allowNull: false,
        field: "identification_name",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      formData: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "form_data",
      },
      image: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      startingDate: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: "starting_date",
      },
      closingDate: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: "closing_date",
      },
      startingTime: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: "starting_time",
      },
      closingTime: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: "closing_time",
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      organiserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "organiser_id",
      },
      dateAdded: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "date_added",
      },
      emailNotification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "email_notification",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentGateway: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "paystack",
        field: "payment_gateway",
      },
      airtime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      organiserProfileDisplay: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        field: "organiser_profile_display",
      },
      backgroundImage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "background_image",
      },
      backgroundSetting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "background_setting",
      },
      startDateUtc: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "start_date_utc",
      },
      closingDateUtc: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "closing_date_utc",
      },
      timezone: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "Africa/Lagos",
      },
      autoSwitch: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "auto_switch",
      },
      disabled: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      roqquPayment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "roqqu_payment",
      },
      aimtoget: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      cashPayment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "cash_payment",
      },
    },
    {
      sequelize,
      modelName: "form_detail",
      timestamps: true,
      paranoid: true,
      tableName: "form_details",
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
    }
  );
  return form_detail;
};
