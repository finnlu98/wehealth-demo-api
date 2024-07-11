import express from "express";
import ApiCaller from "./apiCaller/ApiCaller.js";
import Converter from "./converter/Converter.js";
import sequelize from "../db/main.js";
import DatabaseHandler from "./databaseHandler/DatabaseHandler.js";
import Scheduler from "./scheduler/Scheduler.js";
export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Remove magic number
        this.db_connection = sequelize;
        this.scheduler = new Scheduler();
        this.app.get("/", (req, res) => {
            res.send("Server for handling streamlining of dataflow from MET API to Whehealth.");
        });
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
        this.initializeDbConnection();
        this.scheduler.shceduleTask(() => {
            this.initializeAPI();
        });
    }
    async initializeAPI() {
        this.apiCaller = new ApiCaller();
        console.log("----------------------------\n");
        console.log(new Date(), ": Starting weather alerts from Norway processing\n");
        console.log(new Date(), ": Downloading data from MET API\n");
        const call = await this.apiCaller.getCurrentAlerts();
        console.log(new Date(), ": Converting data to wehealth structure\n");
        this.converter = new Converter(call);
        console.log(new Date(), ": Checking for new changes to alerts in DB\n");
        this.database_handler = new DatabaseHandler(this.converter.getAlerts());
        const [new_alerts, updated_alerts] = await this.database_handler.processNewAlerts();
        console.log("\n");
        console.log(new Date(), ": Querying wehealth API");
        this.apiCaller.setWehealthAlerts(new_alerts);
        this.apiCaller.updateWehealthAlerts(updated_alerts);
        console.log(new Date(), ": Process finished\n");
        console.log("----------------------------\n");
    }
    // Add migration to this
    async initializeDbConnection() {
        try {
            await this.db_connection.sync(); // sync all models
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
}
//# sourceMappingURL=Server.js.map