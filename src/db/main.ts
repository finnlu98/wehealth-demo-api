import { Sequelize } from "sequelize-typescript";

import { Alert } from "./models/Alert.js";

const sequelize = new Sequelize({
  database: "some_db",
  dialect: "sqlite",
  storage: "met_db.sqlite",
  username: "root",
  password: "",
  logging: console.log,
});

sequelize.addModels([Alert]);

export default sequelize;