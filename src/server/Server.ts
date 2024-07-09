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
    this.port = process.env.PORT || 3000;
    this.apiCaller = new ApiCaller();
    this.db_connection = sequelize;

    this.app.get("/", (req, res) => {
      res.send("Hello World!");
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

    this.database_handler.insertAlerts();
  }

  // FORCES DB TO MATCH MODEL STRUCTURE - SWITCH WITH MIGRATION
  private async initializeDbConnection() {
    try {
      await this.db_connection.sync({ force: true }); // sync all models
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  private caller(): void {
    console.log("Called 1");
  }

  private scheduleCaller(): void {
    this.caller();

    setInterval(() => {
      this.caller();
    }, 5000);
  }
}
