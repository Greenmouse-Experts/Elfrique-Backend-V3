require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateUniqueId = require("generate-unique-id");
const uniqueString = require("unique-string");
const nodemailer = require("nodemailer");
//const sequelize = require("../config/db");
const User = require("../models").organiser;
const ResetPasswords = require("../models").resetpassword;
// const Profile = require("../models").organiser;

const excludeAtrrbutes = { exclude: ["createdAt", "updatedAt", "deletedAt"] };

// imports initialization
const { Op } = require("sequelize");

exports.getUserProfile = async (req, res) => {
  try {
    const adminuserId = req.user.id;
    const user = await User.findOne({
      where: { id: adminuserId },
    });
    // const user_votes_count = req.user.findAll({
    //   attributes: {
    //     include: [
    //       [
    //         Sequelize.fn("COUNT", Sequelize.col("votes.adminUserId")),
    //         "userVotesCount",
    //       ],
    //     ],
    //   },
    //   include: [
    //     {
    //       model: votes,
    //       attributes: [],
    //     },
    //   ],
    // });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      profile: {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        phonenumber: user.phone,
        email: user.profile_email,
        accountnumber: user.account_number,
        accountname: user.account_name,
        about: user.about,
        bankname: user.bank,
        gender: user.gender,
        twitterURL: user.twitter_url,
        facebookURL: user.facebook_url,
        instagramURL: user.instagram_url,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        adminuser: {
          id: user.id,
          firstname: user.first_name,
          lastname: user.last_name,
          phonenumber: user.phone,
          email: user.email,
          password: user.password,
          referral_email: user.ref_email,
          email_token: user.verification_token,
          activated: user.verification_status,
          reference: user.reference,
          referral_id: user.referral_id,
          role: user.admin_level ? "admin" : "seller",
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.editUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      // include: [
      //   {
      //     model: Profile,
      //     as: "profile",
      //     attributes: excludeAtrrbutes,
      //   },
      // ],
    });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    //const { firstname, lastname, phonenumber, email, accountnumber, accountname, about, bankname,gender,twitterURL,facebookURL,instagramURL } = req.body
    /* const newProfile = await Profile.update(req.body, {
      where: {
        id: user.id,
      },
    }); */

    // const profile = await Profile.findOne({
    //   where: { adminuserId: req.user.id },
    // });

    await user.update({
      // id: 1,

      first_name: req.body.firstname,
      last_name: req.body.lastname,
      phone: req.body.phonenumber,
      profile_email: req.body.email,
      account_number: req.body.accountnumber,
      account_name: req.body.accountname,
      about: req.body.about,
      bank: req.body.bankname,
      gender: req.body.gender,
      twitter_url: req.body.twitterURL,
      facebook_url: req.body.facebookURL,
      instagram_url: req.body.instagramURL,
      updatedAt: req.body.updatedAt,
    });
    return res.status(200).send({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.changePassWord = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      // include: [
      //   {
      //     model: Profile,
      //     as: "profile",
      //     attributes: excludeAtrrbutes,
      //   },
      // ],
    });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    let isMatch = await bcrypt.compare(oldPassword, user.password);
    // let compare = bcrypt.compareSync(password, user.password);
    if (user.password[0] != "$") {
      isMatch =
        crypto.createHash("sha1").update(oldPassword).digest("hex") ===
        user.password;
    }
    if (!isMatch) {
      return res.status(401).send({
        message: "Incorrect password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await user.update({
      password: hashedPassword,
    });
    return res.status(200).send({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

exports.becomeASeller = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: excludeAtrrbutes,
        },
      ],
    });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const newProfile = await Profile.update(req.body, {
      where: {
        adminuserId: {
          [Op.eq]: req.user.id,
        },
      },
    });

    await user.update({
      role: "seller",
    });
    return res.status(200).send({
      status: "success",
      message: "You are now a seller",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};
