import { Sequelize } from "sequelize-typescript";
import { Alert } from "./models/Alert.js";
/**
 *
 
const sequelize = new Sequelize({
  database: "some_db",
  dialect: "sqlite",
  storage: "met_db.sqlite",
  username: "root",
  password: "",
  logging: false,
});
*/
/**
const sequelize = new Sequelize({
  database: "wehealth-demo-db-dev",
  dialect: "postgres",
  host: "34.45.34.122",
  port: 5432,
  username: "postgres", // Replace with your actual username
  password: "postgres", // Replace with your actual password
  logging: false,
  dialectOptions: {
    ssl: false, // Set to true if SSL is enabled on your PostgreSQL server
  },
});
*/
const sequelize = new Sequelize({
    database: "wehealth-demo-db-loc",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // Replace with your actual username
    password: "FerdigIKS!!!1", // Replace with your actual password
    logging: false,
    dialectOptions: {
        ssl: false, // Set to true if SSL is enabled on your PostgreSQL server
    },
});
sequelize.addModels([Alert]);
export default sequelize;
//# sourceMappingURL=main.js.map