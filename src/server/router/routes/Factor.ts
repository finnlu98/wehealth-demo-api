import { Request, Response, Router } from "express";
import FactorHandler from "../../databaseHandler/FactorHandler.js";
import { WehealthFactor } from "../../../db/models/WehealthFactor.js";

export class Factor {
  api_router: Router;
  route: Router;
  subroute: string;
  no_factor_route: string;
  wh_factor_route: string;
  factorHandler: FactorHandler;

  constructor(api_router: Router) {
    this.api_router = api_router;
    this.factorHandler = new FactorHandler();

    this.subroute = "/factor";
    this.no_factor_route = "/no";
    this.wh_factor_route = "/wh";

    this.setupRoute();
  }

  public setupRoute(): void {
    this.getWhFactors();
    this.getNoFactors();
    this.createWhFactor();
    this.createNoFactor();
    this.updateWhFactor();
    this.updateNoFactor();
    this.deleteWhFactor();
    this.deleteNoFactor();
  }

  public getWhFactors() {
    this.getRecords(this.wh_factor_route, this.factorHandler.getWhFactors);
  }

  public getNoFactors() {
    this.getRecords(this.no_factor_route, this.factorHandler.getNoFactors);
  }

  public getRecords(factor_route: string, handler: () => Promise<any>) {
    this.api_router.get(
      `${this.subroute}${factor_route}`,
      async (req: Request, res: Response) => {
        try {
          const factors = await handler.call(this.factorHandler);
          res.status(200).send(factors);
        } catch (error) {
          res.status(500).send({ error: "An error occurred" });
        }
      }
    );
  }

  public createWhFactor() {
    this.createRecord(this.wh_factor_route, this.factorHandler.createWhFactor);
  }

  public createNoFactor() {
    this.createRecord(this.no_factor_route, this.factorHandler.createNoFactor);
  }

  public createRecord(
    factor_route: string,
    handler: (req: Record<string, string>) => Promise<any>
  ) {
    this.api_router.post(
      `${this.subroute}${factor_route}`,
      async (req: Request, res: Response) => {
        try {
          const factors = await handler.call(this.factorHandler, req.body);
          res.status(200).send(factors);
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "An error occurred" });
        }
      }
    );
  }

  public updateWhFactor() {
    this.updateRecord(this.wh_factor_route, this.factorHandler.updateWhFactor);
  }

  public updateNoFactor() {
    this.updateRecord(this.no_factor_route, this.factorHandler.updateNoFactor);
  }

  public updateRecord(
    factor_route: string,
    handler: (req: Record<string, string>) => Promise<any>
  ) {
    this.api_router.put(
      `${this.subroute}${factor_route}`,
      async (req: Request, res: Response) => {
        try {
          const num_updated = await handler.call(this.factorHandler, req.body);

          if (num_updated > 0) {
            res.status(201).send({
              message: "Updated community",
              res: req.body,
            });
          } else {
            res
              .status(201)
              .send({ message: "Factor does not exists", res: null });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "An error occurred" });
        }
      }
    );
  }

  public deleteWhFactor() {
    this.deleteRecord(this.wh_factor_route, this.factorHandler.deleteWhFactor);
  }

  public deleteNoFactor() {
    this.deleteRecord(this.no_factor_route, this.factorHandler.deleteNoFactor);
  }

  public deleteRecord(
    factor_route: string,
    handler: (req: Record<string, string>) => Promise<any>
  ) {
    this.api_router.delete(
      `${this.subroute}${factor_route}`,
      async (req: Request, res: Response) => {
        try {
          const num_updated = await handler.call(this.factorHandler, req.body);

          if (num_updated > 0) {
            res.status(201).send({
              message: "Deleted factor",
              res: req.body,
            });
          } else {
            res
              .status(201)
              .send({ message: "Factor does not exists", res: null });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "An error occurred" });
        }
      }
    );
  }
}
