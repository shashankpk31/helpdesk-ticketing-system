require('dotenv').config();
const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing in environment variables');
}

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
