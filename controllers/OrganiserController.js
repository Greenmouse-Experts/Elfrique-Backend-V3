// package imports
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const uniqueString = require("unique-string");
const nodemailer = require("nodemailer");
const Event = require("../models").event_detail;
const Trivia = require("../models").trivia_detail;
const votingContest = require("../models").voting_detail;
const EventForm = require("../models").form_detail;
// const Ticket = require("../models").eventsTicket;

// const Vendor = require("../models").vendorsub;
// const moment = require("moment");
// const axios = require("axios");
// const generateUniqueId = require("generate-unique-id");
const User = require("../models").organiser;
//local imports

const Admin = require("../models").organiser;
const ResetPasswords = require("../models").ResetPassword;
// imports initialization
const { Op } = require("sequelize");

//controllers

exports.adminLogin = (req, res, next) => {
  res.render("login");
};

exports.signUpUser = (req, res, next) => {
  res.render("signup2");
};

exports.forgotPassword = (req, res, next) => {
  //res.render("auths/login2");
  res.render("forgotpwd");
};

// create admin user
exports.createAdminUser = async (req, res, next) => {
  console.log(req.body);
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      referral_email,
      confirmpassword,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phonenumber ||
      !confirmpassword
    ) {
      req.flash("warning", "Please Fill all required Fields!");
      res.redirect("back");
    } else if (!email.match(mailformat)) {
      req.flash("warning", "Wrong Email Format!");
      res.redirect("back");
    } else if (password.length < 5) {
      req.flash("warning", "Password should be more than 5 characters!");
      res.redirect("back");
    } else if (password !== confirmpassword) {
      req.flash("warning", "Password does not match!");
      res.redirect("back");
    } else {
      const admin = await Admin.findOne({ where: { email } });
      if (admin) {
        req.flash("warning", "This Email already exists!");
        res.redirect("back");
      } else {
        const hashPwd = bcrypt.hashSync(password, 10);
        const newAdmin = await Admin.create({
          firstname,
          lastname,
          phonenumber,
          email,
          password: hashPwd,
          referral_email,
        });
        req.session.adminId = newAdmin.id;
        console.log(req.session.adminId);
        req.flash("success", "Admin Created Successfully");
        res.redirect("/dashboard");
      }
    }
  } catch (err) {
    req.flash("warning", "Server Error!");
    res.redirect("back");
  }
};

exports.loginAdminUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Please Fill all Fields!");
      res.redirect("back");
    } else {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        req.flash("error", "Invalid Details!");
        res.redirect("back");
      } else {
        // const compare = await bcrypt.compareSync(password, admin.password);
        let compare = bcrypt.compareSync(password, admin.password);
        if (admin.password[0] != "$") {
          compare =
            crypto.createHash("sha1").update(password).digest("hex") ===
            admin.password;
        }
        if (!compare) {
          req.flash("error", "Incorrect Password!");
          res.redirect("back");
        } else {
          req.session.adminId = admin.id;
          console.log(req.session.adminId);
          req.flash("success", "LoggedIn Successfully");
          res.redirect("/dashboard");
        }
      }
    }
  } catch (err) {
    req.flash("error", "Server Error!");
    res.redirect("back");
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const organiser = await User.findOne({
      where: {
        id: {
          [Op.eq]: req.query.id,
        },
      },
      include: [
        {
          model: Event,
          // include: [
          //   {
          //     model: Ticket,
          //   },
          // ],
        },
        {
          model: Trivia,
        },
        {
          model: EventForm,
        },

        {
          model: votingContest,
        },
      ],
    });
    if (!organiser) {
      return res.status(500).send({
        message: "User not found.",
      });
    }
    // const trivia = await Trivia.findAll({
    //   where: {
    //     organiser_id: organiser.id,
    //   },
    // });
    // const votingContests = await votingContest.findAll({
    //   where: {
    //     organisers_id: organiser.id,
    //   },
    // });
    await res.send({
      id: organiser.id,
      firstname: organiser.first_name,
      lastname: organiser.last_name,
      phonenumber: organiser.phone,
      email: organiser.email,
      password: organiser.password,
      referral_email: organiser.ref_email,
      email_token: organiser.verification_token,
      activated: organiser.verification_status,
      reference: organiser.reference,
      referral_id: organiser.referral_id,
      role: organiser.admin_level,
      createdAt: organiser.createdAt,
      updatedAt: organiser.updatedAt,
      events: organiser.event_details,
      votingContests: organiser.voting_details,
      trivia: organiser.trivia_details,
      eventforms: organiser.form_details,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error ",
    });
  }
  // User.findOne({
  //   where: {
  //     id: {
  //       [Op.eq]: req.query.id,
  //     },
  //   },
  //   include: [
  //     {
  //       model: Event,
  //       // include: [
  //       //   {
  //       //     model: Ticket,
  //       //   },
  //       // ],
  //     },
  //     // {
  //     //   model: Trivia,
  //     // },
  //     // {
  //     //   model: EventForm,
  //     // },

  //     // {
  //     //   model: votingContest,
  //     // },
  //   ],
  // })
  //   .then((user) => {
  //     console.log("user is", user);
  //     res.send({
  //       id: user.id,
  //       firstname: user.first_name,
  //       lastname: user.last_name,
  //       phonenumber: user.phone,
  //       email: user.email,
  //       password: user.password,
  //       referral_email: user.ref_email,
  //       email_token: user.verification_token,
  //       activated: user.verification_status,
  //       reference: user.reference,
  //       referral_id: user.referral_id,
  //       role: user.admin_level,
  //       createdAt: user.createdAt,
  //       updatedAt: user.updatedAt,
  //       events: [...user.event_details],
  //       trivia: user.trivia_details,
  //       // eventforms: [
  //       //   {
  //       //     identification_name: null,
  //       //     id: "Aw6zBnMAUS",
  //       //     title: "New form",
  //       //     image:
  //       //       "https://res.cloudinary.com/tashy2022/image/upload/v1663082277/kcipheji0iaq0h788n7b.jpg",
  //       //     description: "Descrip",
  //       //     startdate: "2022-09-13T16:17:00.000Z",
  //       //     closedate: "2021-07-15T16:17:00.000Z",
  //       //     timezone: "Indian/Chagos",
  //       //     fee: "",
  //       //     type: "free",
  //       //     adminuserId: "NvdAQKkN7Y",
  //       //     paymentgateway: "",
  //       //     createdAt: "2022-09-13T15:17:58.000Z",
  //       //     updatedAt: "2022-09-13T15:17:58.000Z",
  //       //     deletedAt: null,
  //       //   },
  //       //   {
  //       //     identification_name: null,
  //       //     id: "PgFV0gCXNO",
  //       //     title: "Title of my event form",
  //       //     image:
  //       //       "https://res.cloudinary.com/tashy2022/image/upload/v1663082194/prhd1lev8ycofb7o02dm.jpg",
  //       //     description: "The description for this form",
  //       //     startdate: "2022-09-13T16:15:00.000Z",
  //       //     closedate: "2022-12-31T18:15:00.000Z",
  //       //     timezone: "Africa/Lagos",
  //       //     fee: "",
  //       //     type: "free",
  //       //     adminuserId: "NvdAQKkN7Y",
  //       //     paymentgateway: "",
  //       //     createdAt: "2022-09-13T15:16:34.000Z",
  //       //     updatedAt: "2022-09-13T15:16:34.000Z",
  //       //     deletedAt: null,
  //       //   },
  //       // ],

  //       // votingContests: [
  //       //   {
  //       //     id: "gYW25hHlIJ",
  //       //     title: "Halloween Contest",
  //       //     type: "paid",
  //       //     identification_name: null,
  //       //     votelimit: "unlimited",
  //       //     startdate: "2022-09-13",
  //       //     closedate: "2022-10-01",
  //       //     timezone: "Africa/Lagos",
  //       //     paymentgateway: "paystack",
  //       //     fee: "100",
  //       //     packagestatus: "disabled",
  //       //     image:
  //       //       "https://res.cloudinary.com/tashy2022/image/upload/v1663076281/zojrwcd6z1ddqusvbpxy.jpg",
  //       //     status: true,
  //       //     createdAt: "2022-09-13T13:38:02.000Z",
  //       //     updatedAt: "2022-09-13T13:38:02.000Z",
  //       //     adminuserId: "NvdAQKkN7Y",
  //       //   },
  //       // ],
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while searching eventJob.",
  //     });
  //   });
};

exports.postGetLink = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      req.flash("warning", "Please enter email");
      res.redirect("back");
    } else {
      const user = await Admin.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });

      if (!user) {
        req.flash("warning", "Email not found");
        res.redirect("back");
      } else {
        let token = uniqueString();
        const output = `<html>
              <head>
                <title>Reset Password link for elfrique account</title>
              </head>
              <body>
              <p>You requested to change your password, please ignore If you didn't make the request</p>
              <a style="width: 100px; background: #FFA73B; color: #fff; height: 50px; padding: 12px 20px; text-decoration: none; margin-top: 30px;" href='${process.env.SITE_URL}/resetpassword?email=${email}&token=${token}'>RESET PASSWORD</a>
              </body>
        </html>`;

        let transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
          },
        });

        // send mail with defined transport object
        let mailOptions = {
          from: ` "elfrique" <${parameters.EMAIL_USERNAME}>`, // sender address
          to: `${email}`, // list of receivers
          subject: "[elfrique] Please reset your password", // Subject line
          text: "Elfrique", // plain text body
          html: output, // html body
        };

        // insert into forgot password the value of the token and email
        // if email exists already update else insert new
        const reset = await ResetPasswords.findOne({
          where: {
            user_email: {
              [Op.eq]: email,
            },
          },
        });
        if (reset) {
          const update = await ResetPasswords.update(
            {
              token: token,
            },
            {
              where: {
                user_email: {
                  [Op.eq]: email,
                },
              },
            }
          );
        } else {
          const newRes = await ResetPasswords.create({
            user_email: email,
            token: token,
            status: 0,
          });
        }

        // Send mail
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            req.flash("error", "Error sending mail");
            res.redirect("back");
          } else {
            req.flash("success", "Reset link sent to email");
            res.redirect("back");
          }
        });
      }
    }
  } catch (error) {
    req.flash("error", "Try again, something went wrong!");
    res.redirect("back");
  }
};

exports.resetPassword = (req, res, next) => {
  let email = req.query.email;
  let token = req.query.token;

  ResetPasswords.findOne({
    where: {
      [Op.and]: [
        {
          user_email: {
            [Op.eq]: email,
          },
        },
        {
          token: {
            [Op.eq]: token,
          },
        },
      ],
    },
  })
    .then((reset) => {
      if (reset) {
        // save as session the reset email and reset token
        req.session.resetEmail = email;
        req.session.resetToken = token;

        res.render("resetpassword");
      } else {
        req.flash("warning", "Invalid reset details");
        res.redirect("/");
      }
    })
    .catch((error) => {
      req.flash("error", "Server Error, try again!");
      res.redirect("/");
    });
};

exports.postResetPassword = (req, res, next) => {
  const { password, confirmpassword } = req.body;
  if (!password || confirmpassword) {
    req.flash("warning", "Enter Passwords");
    res.redirect("back");
  } else if (password != confirmpassword) {
    req.flash("warning", "Passwords must match");
    res.redirect("back");
  } else if (password.length < 6) {
    req.flash("warning", "Passwords must be greater than 5 letters");
    res.redirect("back");
  } else {
    let currentPassword = bcrypt.hashSync(password, 10);
    Users.update(
      {
        password: currentPassword,
      },
      {
        where: {
          email: {
            [Op.eq]: req.session.resetEmail,
          },
        },
      }
    )
      .then((update) => {
        req.flash("success", "Password changed successfully!");
        res.redirect("/login");
      })
      .catch((error) => {
        req.flash("error", "Server Error, try again!");
        res.redirect("back");
      });
  }
};
