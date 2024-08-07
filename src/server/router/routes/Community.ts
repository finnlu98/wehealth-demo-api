import { Request, Response, Router } from "express";
import CommunityHandler from "../../databaseHandler/CommunityHandler.js";

export class Community {
  api_router: Router;
  route: Router;
  subroute: string;
  communityHandler: CommunityHandler;

  constructor(api_router: Router) {
    this.api_router = api_router;
    this.communityHandler = new CommunityHandler();

    this.subroute = "/community";

    this.setupRoute();
  }

  public setupRoute(): void {
    this.getCommunities();
    this.createCommunities();
    this.updateCommunities();
    this.deleteCommunities();
  }

  public getCommunities() {
    this.api_router.get(this.subroute, async (req: Request, res: Response) => {
      const communities = await this.communityHandler.getCommunities();

      res.status(200).send(communities);
    });
  }

  public createCommunities() {
    this.api_router.post(this.subroute, async (req: Request, res: Response) => {
      try {
        if (Array.isArray(req.body)) {
          const new_communities = await this.communityHandler.createCommunities(
            req.body
          );
          res
            .status(201)
            .send({ message: "Created new communities", res: new_communities });
        } else {
          const { wh_community } = req.body;
          const new_community =
            await this.communityHandler.createCommunity(wh_community);

          res
            .status(201)
            .send({ message: "Created new community", res: new_community });
        }
      } catch (error) {
        res.status(500).send({ error: "Failed to create community" });
      }
    });
  }

  // MISSING BULK UPDATE
  public updateCommunities() {
    this.api_router.put(this.subroute, async (req: Request, res: Response) => {
      try {
        const { wh_community, new_wh_community } = req.body;
        const up_community = await this.communityHandler.updateCommunity(
          wh_community,
          new_wh_community
        );

        if (up_community > 0) {
          res.status(201).send({
            message: "Updated community",
            res: {
              old_wh_community: wh_community,
              new_wh_community: new_wh_community,
            },
          });
        } else {
          res
            .status(201)
            .send({ message: "Community does not exists", res: null });
        }
      } catch (error) {
        res.status(500).send({ error: "Failed to create community" });
      }
    });
  }

  // MISSING BULK DELETE
  public deleteCommunities() {
    this.api_router.delete(
      this.subroute,
      async (req: Request, res: Response) => {
        try {
          if (Array.isArray(req.body)) {
            console.log(req.body);
            res.send("NOT IMPLEMENTED");
          } else {
            const { wh_community } = req.body;
            const del_community =
              await this.communityHandler.deleteCommunity(wh_community);

            if (del_community > 0) {
              res
                .status(201)
                .send({ message: "Deleted community", res: wh_community });
            } else {
              res
                .status(201)
                .send({ message: "Community does not exists", res: null });
            }
          }
        } catch (error) {
          res.status(500).send({ error: "Failed to create community" });
        }
      }
    );
  }
}
