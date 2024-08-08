import { where } from "sequelize";
import { WehealthFactor } from "../../db/models/WehealthFactor.js";
import { NorwayFactor } from "../../db/models/NorwayFactor.js";
import sequelize from "../../db/main.js";

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
    wh_factor_reg: Record<any, any>,
    transaction: any
  ): Promise<WehealthFactor> {
    const { wh_factor } = wh_factor_reg;

    try {
      const new_factor = WehealthFactor.create(
        {
          wh_factor: wh_factor,
        },
        { transaction }
      );
      return new_factor;
    } catch (error) {
      console.error("Failed to create Wehealth Factor:", error);
      throw new Error("Failed to create Wehealth Factor");
    }
  }

  async createNoFactor(
    no_wh_factor: Record<string, string>,
    transaction: any
  ): Promise<NorwayFactor> {
    const { no_factor, wh_factor } = no_wh_factor;
    try {
      const new_factor = NorwayFactor.create(
        {
          no_factor: no_factor,
          wh_factor: wh_factor,
        },
        { transaction }
      );
      return new_factor;
    } catch (error) {
      console.error("Failed to create Norway Factor:", error);
      throw new Error("Failed to create Norway Factor");
    }
  }

  async createWhFactors(
    wh_factors: Record<string, string>[]
  ): Promise<WehealthFactor[]> {
    try {
      let created_factors: WehealthFactor[] = [];

      const result = await sequelize.transaction(async (transaction) => {
        for (const wh_factor of wh_factors) {
          created_factors.push(
            await this.createWhFactor(wh_factor, transaction)
          );
        }
      });

      return created_factors;
    } catch (error) {
      throw new Error("Failed to create factors");
    }
  }

  async createNoFactors(
    no_wh_factors: Array<Record<string, string>>
  ): Promise<NorwayFactor[]> {
    try {
      let created_factors: NorwayFactor[] = [];

      const result = await sequelize.transaction(async (transaction) => {
        for (const no_wh_factor of no_wh_factors) {
          created_factors.push(
            await this.createNoFactor(no_wh_factor, transaction)
          );
        }
      });

      return created_factors;
    } catch (error) {
      throw new Error("Failed to create factors");
    }
  }

  async updateWhFactor(
    up_wh_factor: Record<string, string>,
    transaction: any
  ): Promise<number> {
    const { wh_factor, new_wh_factor } = up_wh_factor;

    try {
      const up_factor = await WehealthFactor.update(
        {
          wh_factor: new_wh_factor,
        },
        { where: { wh_factor: wh_factor }, transaction }
      );

      const [affectedCount] = up_factor;

      return affectedCount;
    } catch (error) {
      console.error("Failed to update factor:", error);
      throw new Error("Failed to update factor");
    }
  }

  async updateNoFactor(
    up_no_wh_factor: Record<string, string>,
    transaction: any
  ): Promise<number> {
    const { no_factor, new_no_factor, new_wh_factor } = up_no_wh_factor;

    // this can be done smoother..
    const queryFactors: Record<string, string | undefined> = {};
    if (new_no_factor !== undefined) queryFactors.no_factor = new_no_factor;
    if (new_wh_factor !== undefined) queryFactors.wh_factor = new_wh_factor;

    try {
      const up_factor = await NorwayFactor.update(queryFactors, {
        where: { no_factor: no_factor },
        transaction,
      });

      const [affectedCount] = up_factor;

      return affectedCount;
    } catch (error) {
      console.error("Failed to update community:", error);
      throw new Error("Failed to update community");
    }
  }

  async updateWhFactors(wh_factors: Record<string, string>[]): Promise<number> {
    try {
      let updated_records = 0;

      const result = await sequelize.transaction(async (transaction) => {
        for (const wh_factor of wh_factors) {
          updated_records += await this.updateWhFactor(wh_factor, transaction);
        }
      });

      return updated_records;
    } catch (error) {
      throw new Error("Failed to update factors");
    }
  }

  async updateNoFactors(
    no_wh_factors: Record<string, string>[]
  ): Promise<number> {
    try {
      let updated_records = 0;

      const result = await sequelize.transaction(async (transaction) => {
        for (const wh_factor of no_wh_factors) {
          updated_records += await this.updateNoFactor(wh_factor, transaction);
        }
      });

      return updated_records;
    } catch (error) {
      throw new Error("Failed to update factors");
    }
  }

  async deleteWhFactor(
    wh_factor_del: Record<any, any>,
    transaction: any
  ): Promise<number> {
    const { wh_factor } = wh_factor_del;

    try {
      const del_factor = await WehealthFactor.destroy({
        where: {
          wh_factor: wh_factor,
        },
        transaction,
      });

      return del_factor;
    } catch (error) {
      console.error("Failed to delete Wehealth factor:", error);
      throw new Error("Failed to delete Wehealth factor");
    }
  }

  async deleteNoFactor(
    no_factor_del: Record<any, any>,
    transaction: any
  ): Promise<number> {
    const { no_factor } = no_factor_del;

    try {
      const del_factor = await NorwayFactor.destroy({
        where: {
          no_factor: no_factor,
        },
        transaction,
      });

      return del_factor;
    } catch (error) {
      console.error("Failed to delete Norway factor:", error);
      throw new Error("Failed to delete Norway factor");
    }
  }

  async deleteWhFactors(wh_factors: Record<string, string>[]): Promise<number> {
    try {
      let deleted_records = 0;

      const result = await sequelize.transaction(async (transaction) => {
        for (const wh_factor of wh_factors) {
          deleted_records += await this.deleteWhFactor(wh_factor, transaction);
        }
      });

      return deleted_records;
    } catch (error) {
      throw new Error("Failed to delete factors");
    }
  }

  async deleteNoFactors(no_factors: Record<string, string>[]): Promise<number> {
    try {
      let deleted_records = 0;

      const result = await sequelize.transaction(async (transaction) => {
        for (const no_factor of no_factors) {
          deleted_records += await this.deleteNoFactor(no_factor, transaction);
        }
      });

      return deleted_records;
    } catch (error) {
      throw new Error("Failed to delete factors");
    }
  }
}
