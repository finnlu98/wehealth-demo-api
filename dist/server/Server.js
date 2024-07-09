import express from "express";
import ApiCaller from "./apiCaller/ApiCaller.js";
import Converter from "./converter/Converter.js";
import sequelize from "../db/main.js";
import DatabaseHandler from "./databaseHandler/DatabaseHandler.js";
export default class Server {
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
    async initializeAPI() {
        const call = await this.apiCaller.getCurrentAlerts();
        this.converter = new Converter(call);
        this.database_handler = new DatabaseHandler(this.converter.getAlerts());
        this.database_handler.insertAlerts();
    }
    // FORCES DB TO MATCH MODEL STRUCTURE - SWITCH WITH MIGRATION
    async initializeDbConnection() {
        try {
            await this.db_connection.sync({ force: true }); // sync all models
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
    caller() {
        console.log("Called 1");
    }
    scheduleCaller() {
        this.caller();
        setInterval(() => {
            this.caller();
        }, 5000);
    }
}
//# sourceMappingURL=Server.js.map