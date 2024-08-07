import express, { Application, Router } from "express";
import { Community } from "./routes/Community.js";
import { Factor } from "./routes/Factor.js";

export class Routes {
  app: Application;
  api_router: Router;

  constructor(app: express.Application) {
    this.app = app;
    this.app.use(express.json());
    this.api_router = Router();

    this.app.get("/", (req, res) => {
      res.send(
        "Server for handling streamlining of dataflow from Norwegian extreme weather alerts to Whehealth.\n\nContact: sameer@wehealth.org"
      );
    });

    this.setupRoutes();
  }

  public setupRoutes(): void {
    const community = new Community(this.api_router);
    const factor = new Factor(this.api_router);

    this.app.use("/api", community.api_router);
    this.app.use("/api", factor.api_router);
  }
}
