"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class organiser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // organiser.hasOne(models.profile);
      // organiser.hasMany(models.votingContest);
      // organiser.hasMany(models.vendorsub);
      // organiser.hasMany(models.awardContest);
      // organiser.hasMany(models.event);
      // organiser.hasMany(models.trivia);
      // organiser.hasMany(models.eventform);
      // organiser.hasMany(models.Referral, {
      //   foreignKey: "user_id",
      //   as: "ref_user",
      // });
      // organiser.hasMany(models.Referral, {
      //   foreignKey: "referral_id",
      //   as: "referrer",
      // });
    }
  }
  organiser.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      account_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      account_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bank: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date_added: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      social_login_type: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      social_picture_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password_reset_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      verification_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      verification_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      admin_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      facebook_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      twitter_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instagram_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ref_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      referral_id: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      reference: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      referral_type: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "unlimited",
      },
      referral_percent: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      referral_times: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      referral_nature: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "flexible",
      },
      notification_setting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
    // {
    //   sequelize,
    //   tableName: "organisers",
    //   timestamps: false,
    //   indexes: [
    //     {
    //       name: "PRIMARY",
    //       unique: true,
    //       using: "BTREE",
    //       fields: [{ name: "id" }],
    //     },
    //   ],
    // },
    // {
    //   id: {
    //     type: DataTypes.STRING(10),
    //     autoincrement: false,
    //     allowNull: false,
    //     primaryKey: true,
    //     defaultValue: () => nanoid(10)
    // },
    //   firstname: DataTypes.STRING,
    //   lastname: DataTypes.STRING,
    //   phonenumber: DataTypes.STRING,
    //   email: DataTypes.STRING,
    //   password: DataTypes.STRING,
    //   referral_email: DataTypes.STRING,
    //   email_token: {
    //     allowNull: true,
    //     type: DataTypes.STRING,
    //   },
    //   activated: {
    //     allowNull: true,
    //     type: DataTypes.TINYINT,
    //     defaultValue: 0,
    //   },
    //   reference: {
    //     allowNull: true,
    //     type: DataTypes.STRING,
    //   },
    //   referral_id: {
    //     allowNull: true,
    //     type: DataTypes.STRING,
    //   },
    //   role: {
    //     allowNull: false,
    //     type: DataTypes.ENUM("seller", "normalUser", "admin"),
    //     defaultValue: "normalUser",
    //   },
    // },
    {
      sequelize,
      modelName: "organiser",
    }
  );
  return organiser;
};
