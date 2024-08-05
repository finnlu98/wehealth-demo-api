import { Alert as AlertModel } from "../../models/Alert.js";
import { Alert as AlertSeq } from "../../db/models/Alert.js";
import { IWeHealthAlert } from "../../models/WehealthAlert.js";

export default class DatabaseHandler {
  current_alerts: AlertModel[];

  constructor(alerts: AlertModel[]) {
    this.current_alerts = alerts;
  }

  // SPLIT FUNCTION!
  async processNewAlerts(): Promise<[AlertModel[], AlertModel[]]> {
    let new_alerts: AlertModel[] = [];
    let updated_alerts: AlertModel[] = [];

    for (const alert of this.current_alerts) {
      try {
        const cur_alert = await AlertSeq.findByPk(
          alert.weHealthAlert.external_alert_id
        );

        if (!cur_alert) {
          // create record
          const new_alert = await AlertSeq.create({
            external_alert_id: alert.weHealthAlert.external_alert_id,
            wh_title: alert.weHealthAlert.wh_title,
            wh_factor: alert.weHealthAlert.wh_factor,
            wh_level: alert.weHealthAlert.wh_level,
            wh_alert_issue_date: alert.weHealthAlert.wh_alert_issued_date,
            wh_event_start_time: alert.weHealthAlert.wh_event_start_date,
            wh_event_end_time: alert.weHealthAlert.wh_event_end_date,
          });

          console.log(
            `${new Date()}: Found new ${alert.weHealthAlert.wh_factor} alert!`
          );
          new_alerts.push(alert);
        } else {
          cur_alert.update({
            wh_title: alert.weHealthAlert.wh_title,
            wh_factor: alert.weHealthAlert.wh_factor,
            wh_level: alert.weHealthAlert.wh_level,
            wh_alert_issue_date: alert.weHealthAlert.wh_alert_issued_date,
            wh_event_start_time: alert.weHealthAlert.wh_event_start_date,
            wh_event_end_time: alert.weHealthAlert.wh_event_end_date,
          });

          if (cur_alert.changed() != false) {
            console.log(
              `${new Date()}: Found update to ${alert.weHealthAlert.wh_factor} alert!`
            );

            updated_alerts.push(alert);
          }
        }
      } catch (error) {
        console.error("Failed to upsert", alert, error);
      }
    }

    return [new_alerts, updated_alerts];
  }

  // Divide into smaller task
  async findAndSetNewAlert(alert: IWeHealthAlert) {}

  // Divide into smaller task
  async updateAlert() {}
}
