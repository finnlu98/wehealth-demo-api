import { where } from "sequelize";
import { WehealthFactor } from "../../db/models/WehealthFactor.js";
import { NorwayFactor } from "../../db/models/NorwayFactor.js";

export default class FactorHandler {
  wh_factor: WehealthFactor;
  no_factor: NorwayFactor;

  constructor() {
    this.wh_factor = new WehealthFactor();
    this.no_factor = new NorwayFactor();
  }

  async getWhFactors(): Promise<WehealthFactor[]> {
    try {
      const wh_factors = await WehealthFactor.findAll({ raw: true });
      return wh_factors;
    } catch (error) {
      console.error("Failed to fetch Wehealth factors:", error);
      throw new Error("Failed to fetch Wehealth factors");
    }
  }

  async getNoFactors(): Promise<NorwayFactor[]> {
    try {
      const no_factors = await NorwayFactor.findAll({ raw: true });
      return no_factors;
    } catch (error) {
      console.error("Failed to fetch Norway factors:", error);
      throw new Error("Failed to fetch Norway factors");
    }
  }

  async createWhFactor(
    wh_factor_reg: Record<any, any>
  ): Promise<WehealthFactor> {
    const { wh_factor } = wh_factor_reg;

    try {
      const new_factor = WehealthFactor.create(
        {
          wh_factor: wh_factor,
        },
        { raw: true }
      );
      return new_factor;
    } catch (error) {
      console.error("Failed to create Wehealth Factor:", error);
      throw new Error("Failed to create Wehealth Factor");
    }
  }

  async createNoFactor(
    no_wh_factor: Record<string, string>
  ): Promise<NorwayFactor> {
    const { no_factor, wh_factor } = no_wh_factor;
    try {
      const new_factor = NorwayFactor.create(
        {
          no_factor: no_factor,
          wh_factor: wh_factor,
        },
        { raw: true }
      );
      return new_factor;
    } catch (error) {
      console.error("Failed to create Norway Factor:", error);
      throw new Error("Failed to create Norway Factor");
    }
  }

  // TODO
  async createWhFactors(wh_factors: string[]): Promise<WehealthFactor[]> {
    return;
  }

  async createNoFactors(
    no_wh_factors: Array<Record<string, string>>
  ): Promise<NorwayFactor[]> {
    return;
  }

  async updateWhFactor(up_wh_factor: Record<string, string>): Promise<number> {
    const { wh_factor, new_wh_factor } = up_wh_factor;

    try {
      const up_factor = await WehealthFactor.update(
        {
          wh_factor: new_wh_factor,
        },
        { where: { wh_factor: wh_factor } }
      );

      const [affectedCount] = up_factor;

      return affectedCount;
    } catch (error) {
      console.error("Failed to update community:", error);
      throw new Error("Failed to update community");
    }
  }

  async updateNoFactor(
    up_no_wh_factor: Record<string, string>
  ): Promise<number> {
    const { no_factor, new_no_factor, new_wh_factor } = up_no_wh_factor;

    // this can be done smoother..
    const queryFactors: Record<string, string | undefined> = {};
    if (new_no_factor !== undefined) queryFactors.no_factor = new_no_factor;
    if (new_wh_factor !== undefined) queryFactors.wh_factor = new_wh_factor;

    try {
      const up_factor = await NorwayFactor.update(queryFactors, {
        where: { no_factor: no_factor },
      });

      const [affectedCount] = up_factor;

      return affectedCount;
    } catch (error) {
      console.error("Failed to update community:", error);
      throw new Error("Failed to update community");
    }
  }

  async deleteWhFactor(wh_factor_del: Record<any, any>): Promise<number> {
    const { wh_factor } = wh_factor_del;

    try {
      const del_factor = await WehealthFactor.destroy({
        where: {
          wh_factor: wh_factor,
        },
      });

      return del_factor;
    } catch (error) {
      console.error("Failed to delete Wehealth factor:", error);
      throw new Error("Failed to delete Wehealth factor");
    }
  }

  async deleteNoFactor(no_factor_del: Record<any, any>): Promise<number> {
    const { no_factor } = no_factor_del;

    try {
      const del_factor = await NorwayFactor.destroy({
        where: {
          no_factor: no_factor,
        },
      });

      return del_factor;
    } catch (error) {
      console.error("Failed to delete Norway factor:", error);
      throw new Error("Failed to delete Norway factor");
    }
  }
}
