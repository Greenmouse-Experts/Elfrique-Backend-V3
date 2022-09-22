const { organiser } = require("../models");

module.exports = async (req, res) => {
  const text = "migrating...<br/><a href='/api/v1/merge'>Merge dbs</a>";
  organiser.sync({ alter: true });

  console.log("Added models");
};
