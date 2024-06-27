import express from "express";
import ApiCaller from "./apiCaller/ApiCaller.js";

class Server {
  app: express.Application;
  port: string | number;
  apiCaller: ApiCaller;

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

  private async initialize(): Promise<void> {
    const call = await this.apiCaller.getCurrentAlerts();
    console.log(call);
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

export default Server;
