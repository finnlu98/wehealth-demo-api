import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";

import { NorwayFactor } from "./NorwayFactor.js";
import { Alert } from "./Alert.js";

@Table
export class WehealthFactor extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  wh_factor: string;

  @HasMany(() => NorwayFactor)
  no_factor: NorwayFactor[];

  @HasMany(() => Alert)
  wh_alert: Alert[];
}
