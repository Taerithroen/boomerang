const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
);

const Stat = sequelize.define('Stat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  kills: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  moves: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'stats',
  timestamps: true, // добавим временные метки
});

// Простая синхронизация с обработкой ошибок
Stat.sync({ force: false }).catch(console.error);

module.exports = Stat;