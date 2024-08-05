import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";

import { WehealthFactor } from "./WehealthFactor.js";

@Table
export class NorwayFactor extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  no_factor: string;

  @ForeignKey(() => WehealthFactor)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  wh_factor: string;

  getWhFactor(): string {
    return this.wh_factor;
  }

  getNoFactor(): string {
    return this.no_factor;
  }
}
