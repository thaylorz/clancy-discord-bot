import * as sequelize from 'sequelize';
import dotenv from 'dotenv';
import { priceAlertFactory } from './price-alert-model';

dotenv.config();

export const databaseConfig = new sequelize.Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export const PriceAlert = priceAlertFactory(databaseConfig);
