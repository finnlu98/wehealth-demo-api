import FactorHandler from "../../databaseHandler/FactorHandler.js";
export class Factor {
    constructor(api_router) {
        this.api_router = api_router;
        this.factorHandler = new FactorHandler();
        this.subroute = "/factor";
        this.no_factor_route = "/no";
        this.wh_factor_route = "/wh";
        this.setupRoute();
    }
    setupRoute() {
        this.getWhFactors();
        this.getNoFactors();
        this.createWhFactor();
        this.createNoFactor();
        this.updateWhFactor();
        this.updateNoFactor();
        this.deleteWhFactor();
        this.deleteNoFactor();
    }
    getWhFactors() {
        this.getRecords(this.wh_factor_route, this.factorHandler.getWhFactors);
    }
    getNoFactors() {
        this.getRecords(this.no_factor_route, this.factorHandler.getNoFactors);
    }
    getRecords(factor_route, handler) {
        this.api_router.get(`${this.subroute}${factor_route}`, async (req, res) => {
            try {
                const factors = await handler.call(this.factorHandler);
                res.status(200).send(factors);
            }
            catch (error) {
                res.status(500).send({ error: "An error occurred" });
            }
        });
    }
    createWhFactor() {
        this.createRecord(this.wh_factor_route, this.factorHandler.createWhFactors);
    }
    createNoFactor() {
        this.createRecord(this.no_factor_route, this.factorHandler.createNoFactors);
    }
    createRecord(factor_route, handler) {
        this.api_router.post(`${this.subroute}${factor_route}`, async (req, res) => {
            try {
                const req_formatter = Array.isArray(req.body) ? req.body : [req.body];
                const factors = await handler.call(this.factorHandler, req_formatter);
                res.status(200).send(factors);
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ error: "An error occurred" });
            }
        });
    }
    updateWhFactor() {
        this.updateRecord(this.wh_factor_route, this.factorHandler.updateWhFactors);
    }
    updateNoFactor() {
        this.updateRecord(this.no_factor_route, this.factorHandler.updateNoFactors);
    }
    updateRecord(factor_route, handler) {
        this.api_router.put(`${this.subroute}${factor_route}`, async (req, res) => {
            try {
                const req_formatter = Array.isArray(req.body) ? req.body : [req.body];
                const num_updated = await handler.call(this.factorHandler, req_formatter);
                if (num_updated > 0) {
                    res.status(201).send({
                        message: "Updated factor",
                        res: req.body,
                    });
                }
                else {
                    res
                        .status(201)
                        .send({ message: "Factor does not exists", res: null });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ error: "An error occurred" });
            }
        });
    }
    deleteWhFactor() {
        this.deleteRecord(this.wh_factor_route, this.factorHandler.deleteWhFactors);
    }
    deleteNoFactor() {
        this.deleteRecord(this.no_factor_route, this.factorHandler.deleteNoFactors);
    }
    deleteRecord(factor_route, handler) {
        this.api_router.delete(`${this.subroute}${factor_route}`, async (req, res) => {
            try {
                const req_formatter = Array.isArray(req.body) ? req.body : [req.body];
                const num_updated = await handler.call(this.factorHandler, req_formatter);
                if (num_updated > 0) {
                    res.status(201).send({
                        message: "Deleted factor",
                        res: req.body,
                    });
                }
                else {
                    res
                        .status(201)
                        .send({ message: "Factor does not exists", res: null });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ error: "An error occurred" });
            }
        });
    }
}
//# sourceMappingURL=Factor.js.map