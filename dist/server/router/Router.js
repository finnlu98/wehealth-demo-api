export class Router {
    constructor(app) {
        this.app = app;
        this.app.get("/", (req, res) => {
            res.send("Server for handling streamlining of dataflow from Norwegian extreme weather alerts to Whehealth.\n\nContact: sameer@wehealth.org");
        });
        this.routes();
    }
    routes() {
        this.app.get("/_status", (req, res) => {
            res.status(200).send("Healthy!!!");
        });
    }
}
//# sourceMappingURL=Router.js.map