import express from "express";
import ApiCaller from "./apiCaller/ApiCaller.js";
import Converter from "./converter/Converter.js";

import sequelize from "../db/main.js";
import { Sequelize } from "sequelize";
import DatabaseHandler from "./databaseHandler/DatabaseHandler.js";

export default class Server {
  app: express.Application;
  port: string | number;
  apiCaller: ApiCaller;
  converter: Converter;
  db_connection: Sequelize;
  database_handler: DatabaseHandler;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000; // Remove magic number
    this.apiCaller = new ApiCaller();
    this.db_connection = sequelize;

    this.app.get("/", (req, res) => {
      res.send(
        "Server for handling streamlining of dataflow from MET API to Whehealth."
      );
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });

    this.initializeDbConnection();

    this.initializeAPI();
  }

  private async initializeAPI(): Promise<void> {
    const call = await this.apiCaller.getCurrentAlerts();

    this.converter = new Converter(call);

    this.database_handler = new DatabaseHandler(this.converter.getAlerts());

    const [new_alerts, updated_alerts] =
      await this.database_handler.processNewAlerts();

    this.apiCaller.setWehealthAlerts(new_alerts);

    this.apiCaller.updateWehealthAlerts(updated_alerts);
  }

  // Add migration to this
  private async initializeDbConnection() {
    try {
      await this.db_connection.sync(); // sync all models
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
