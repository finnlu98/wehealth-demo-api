import express from "express";
class Server {
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