import express from "express";
import ApiCaller from "./apiCaller/ApiCaller.js";
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.apiCaller = new ApiCaller();
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
        this.initialize();
    }
    async initialize() {
        const call = await this.apiCaller.getCurrentAlerts();
        console.log(call);
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
export default Server;
//# sourceMappingURL=Server.js.map