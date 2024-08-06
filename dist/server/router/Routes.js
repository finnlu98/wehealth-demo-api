import express, { Router } from "express";
import { Community } from "./routes/Community.js";
export class Routes {
    constructor(app) {
        this.app = app;
        this.app.use(express.json());
        this.api_router = Router();
        this.app.get("/", (req, res) => {
            res.send("Server for handling streamlining of dataflow from Norwegian extreme weather alerts to Whehealth.\n\nContact: sameer@wehealth.org");
        });
        this.setupRoutes();
    }
    setupRoutes() {
        const community = new Community(this.api_router);
        this.app.use("/api", community.api_router);
    }
}
//# sourceMappingURL=Routes.js.map