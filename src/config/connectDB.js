const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hoidanit', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  config: {
    timezone: '+07:00',
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
