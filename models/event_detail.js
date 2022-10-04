"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class event_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event_detail.belongsTo(models.organiser);
      // event_detail.hasMany(models.eventsTicket);
      // event_detail.hasMany(models.eventsticket_booked);
      // event_detail.hasMany(models.eventReferral);
    }
  }
  event_detail.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
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
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      organiser_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      venue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      total_tickets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      booked_tickets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ticket_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      event_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email_notification: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      state: {
        type: DataTypes.STRING(225),
        allowNull: true,
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
      country: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(225),
        allowNull: true,
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
      cash_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },

    {
      sequelize,
      modelName: "event_detail",
    }
  );
  return event_detail;
};
