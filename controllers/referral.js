require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateUniqueId = require("generate-unique-id");
const uniqueString = require("unique-string");
const nodemailer = require("nodemailer");
const User = require("../models").organiser;
const ResetPasswords = require("../models").resetpassword;
const SuperAdmin = require("../models").superadmin;
const Referrals = require("../models").Referral;

const excludeAtrrbutes = { exclude: ["createdAt", "updatedAt", "deletedAt"] };

// imports initialization
const { Op } = require("sequelize");

exports.getUserReferrals = async (req, res) => {
  try {
    const adminId = req.user.id;
    const superadmin = await User.findOne({
      where: {
        id: adminId,
      },
    });
    if (superadmin.admin_level) {
      return res.status(404).send({
        message: "Only SuperAdmin can access this route",
      });
    }

    const referrals = await Referrals.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
          ],
        },
      ],
    });

    return res.status(200).send({
      referrals,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

exports.getReferralByUser = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const user = await User.findOne({
      where: { id: adminuserId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const referrals = await Referrals.findAll({
      where: {
        Referral_id: user.adminuserId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
          ],
        },
        {
          model: User,
          as: "referralID",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    });

    return res.status(200).send({
      referrals,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
