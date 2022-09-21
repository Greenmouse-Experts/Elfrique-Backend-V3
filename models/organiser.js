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
      organiser.hasOne(models.profile);
      organiser.hasMany(models.votingContest);
      organiser.hasMany(models.vendorsub);
      organiser.hasMany(models.awardContest);
      organiser.hasMany(models.event);
      organiser.hasMany(models.trivia);
      organiser.hasMany(models.eventform);
      organiser.hasMany(models.Referral, {
        foreignKey: "user_id",
        as: "ref_user",
      });

      organiser.hasMany(models.Referral, {
        foreignKey: "referral_id",
        as: "referrer",
      });
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
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      accountName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "account_name",
      },
      accountNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "account_number",
      },
      bank: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dateAdded: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "date_added",
      },
      socialLoginType: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: "social_login_type",
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      socialPictureLink: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "social_picture_link",
      },
      passwordResetToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "password_reset_token",
      },
      verificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "verification_token",
      },
      verificationStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "verification_status",
      },
      adminLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "admin_level",
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
      facebookUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "facebook_url",
      },
      twitterUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "twitter_url",
      },
      instagramUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "instagram_url",
      },
      refEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "ref_email",
      },
      referralType: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "unlimited",
        field: "referral_type",
      },
      referralPercent: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "referral_percent",
      },
      referralTimes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "referral_times",
      },
      referralNature: {
        type: DataTypes.STRING(225),
        allowNull: true,
        defaultValue: "flexible",
        field: "referral_nature",
      },
      notificationSetting: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        field: "notification_setting",
      },
    },
    {
      sequelize,
      tableName: "organisers",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    },
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
