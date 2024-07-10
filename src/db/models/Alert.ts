import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class Alert extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  external_alert_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wh_title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wh_factor: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wh_level: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  wh_alert_issue_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  wh_event_start_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  wh_event_end_time: Date;
}
