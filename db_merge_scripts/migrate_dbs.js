const {
  organiser,
  event_detail,
  referral,
  trivia_detail,
  voting_detail,
  form_detail,
  contestants,
} = require("../models");

module.exports = async (req, res) => {
  organiser.sync({ alter: true });
  event_detail.sync({ alter: true });
  referral.sync({ alter: true });
  trivia_detail.sync({ alter: true });
  voting_detail.sync({ alter: true });
  form_detail.sync({ alter: true });
  contestants.sync({ alter: true });

  console.log("Added models");
};
