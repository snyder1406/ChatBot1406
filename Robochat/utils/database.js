const { Sequelize } = require("sequelize");
const config = require("../../config");
console.log(
  config.db.host +
    config.db.username +
    config.db.password +
    config.db.port +
    config.db.nameDb
);
const db = new Sequelize({
  dialect: "postgres",
  host: config.db.host,
  username: config.db.username,
  password: config.db.password,
  database: config.db.nameDb,
  port: config.db.port,

  /*  host: 'localhost',
    username: 'postgres',
    password: 'soloyo12',
    database: 'chat',
    port: 5432 */
});

module.exports = db;
