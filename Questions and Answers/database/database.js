const Sequelize = require('sequelize');
const connection = new Sequelize('perguntas', 'root', '663034', {
    host: 'localhost',
    dialect: "mysql"
  });

module.exports = connection;