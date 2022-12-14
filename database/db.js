require("dotenv").config();
const Sequelize = require("sequelize");


const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 80000,
    },
  }
);

/*db.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log("Unable to connect to Database ", err));
*/
module.exports = db;
