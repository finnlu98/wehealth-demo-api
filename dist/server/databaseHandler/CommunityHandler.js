import { WeHealthCommunity } from "../../db/models/WeHealthCommunity.js";
export default class CommunityHandler {
    constructor() {
        this.wh_communities = new WeHealthCommunity();
    }
    async getCommunities() {
        try {
            const communities = await WeHealthCommunity.findAll({ raw: true });
            return communities;
        }
        catch (error) {
            console.error("Failed to fetch communities:", error);
            throw new Error("Failed to fetch communities");
        }
    }
    async createCommunity(wh_community) {
        try {
            const new_community = WeHealthCommunity.create({
                wh_community: wh_community,
            }, { raw: true });
            return new_community;
        }
        catch (error) {
            console.error("Failed to create community:", error);
            throw new Error("Failed to create community");
        }
    }
    async createCommunities(wh_communities) {
        try {
            const new_communities = await WeHealthCommunity.bulkCreate(wh_communities, { fields: ["wh_community"] });
            return new_communities;
        }
        catch (error) {
            console.error("Failed to create communities:", error);
            throw new Error("Failed to create communities");
        }
    }
    async updateCommunity(wh_community, new_wh_community) {
        try {
            const up_community = await WeHealthCommunity.update({
                wh_community: new_wh_community,
            }, { where: { wh_community: wh_community } });
            const [affectedCount] = up_community;
            return affectedCount;
        }
        catch (error) {
            console.error("Failed to update community:", error);
            throw new Error("Failed to update community");
        }
    }
    async deleteCommunity(wh_community) {
        try {
            const del_community = await WeHealthCommunity.destroy({
                where: {
                    wh_community: wh_community,
                },
            });
            return del_community;
        }
        catch (error) {
            console.error("Failed to delete community:", error);
            throw new Error("Failed to delete community");
        }
    }
}
//# sourceMappingURL=CommunityHandler.js.map