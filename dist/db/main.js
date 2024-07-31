import { Sequelize } from "sequelize-typescript";
import { Alert } from "./models/Alert.js";
import { DB_DEV_DATABASE_NAME, DB_DEV_USERNAME, DB_DEV_PASSWORD, DB_DEV_HOST, } from "../config.js";
const sequelize = new Sequelize({
    database: DB_DEV_DATABASE_NAME,
    dialect: "postgres",
    host: DB_DEV_HOST,
    port: 5432,
    username: DB_DEV_USERNAME, // Replace with your actual username
    password: DB_DEV_PASSWORD, // Replace with your actual password
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
  username: DB_LOC_USERNAME, // Replace with your actual username
  password: DB_LOC_PASSWORD, // Replace with your actual password
  logging: false,
  dialectOptions: {
    ssl: false, // Set to true if SSL is enabled on your PostgreSQL server
  },
});
*/
sequelize.addModels([Alert]);
export default sequelize;
//# sourceMappingURL=main.js.map