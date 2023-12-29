const Sequelize = require("sequelize");
const sequelize = require("../database");

module.exports = sequelize.define("Mail", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fromEmail: Sequelize.STRING,
  toEmail: Sequelize.STRING,
  subject: Sequelize.STRING,
  body: Sequelize.TEXT,
  read: Sequelize.BOOLEAN,
});
