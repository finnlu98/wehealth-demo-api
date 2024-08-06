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
  INSTANCE_CONNECTION_NAME,
  DB_DEV_PORT,
} from "../config.js";
import { NorwayFactor } from "./models/NorwayFactor.js";
import { WehealthFactor } from "./models/WehealthFactor.js";
import { WeHealthCommunity } from "./models/WeHealthCommunity.js";

/** 
const sequelize = new Sequelize({
  database: process.env.DB_DEV_DATABASE_NAME,
  username: process.env.DB_DEV_USERNAME,
  password: process.env.DB_DEV_PASSWORD,
  dialect: "postgres",
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  logging: false,
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  },
});
*/

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

sequelize.addModels([Alert, NorwayFactor, WehealthFactor, WeHealthCommunity]);

export default sequelize;
