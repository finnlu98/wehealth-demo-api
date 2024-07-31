import { Sequelize } from "sequelize-typescript";

import { Alert } from "./models/Alert.js";
import {
  DB_LOC_DATABASE_NAME,
  DB_LOC_USERNAME,
  DB_LOC_PASSWORD,
  DB_LOC_PORT,
} from "../config.js";
import {
  DB_DEV_DATABASE_NAME,
  DB_DEV_USERNAME,
  DB_DEV_PASSWORD,
  DB_DEV_HOST,
  DB_DEV_PORT,
} from "../config.js";

const sequelize = new Sequelize({
  database: DB_DEV_DATABASE_NAME,
  dialect: "postgres",
  host: DB_DEV_HOST,
  port: 5432,
  username: DB_DEV_USERNAME,
  password: DB_DEV_PASSWORD,
  logging: false,
  dialectOptions: {
    ssl: false, // Set to true if SSL is enabled on your PostgreSQL server
  },
});

/** 
const sequelize = new Sequelize({
  database: DB_LOC_DATABASE_NAME,
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: DB_LOC_USERNAME, 
  password: DB_LOC_PASSWORD, 
  logging: false,
  dialectOptions: {
    ssl: false, // Set to true if SSL is enabled on your PostgreSQL server
  },
});
*/

sequelize.addModels([Alert]);

export default sequelize;
