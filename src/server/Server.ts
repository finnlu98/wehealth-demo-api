import express from "express";

class Server {
  app: express.Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });

    this.scheduleCaller();
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
