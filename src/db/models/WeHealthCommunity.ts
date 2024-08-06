import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class WeHealthCommunity extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  wh_community: string;

  getCommunity(): string {
    return this.wh_community;
  }
}
