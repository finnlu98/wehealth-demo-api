import { Alert as AlertModel } from "../../models/Alert.js";
import { Alert as AlertSeq } from "../../db/models/Alert.js";

export default class DatabaseHandler {
  currentAlerts: AlertModel[];

  constructor(alerts: AlertModel[]) {
    this.currentAlerts = alerts;
  }

  async insertAlerts() {
    for (const alert of this.currentAlerts) {
      try {
        const [up_record, created] = await AlertSeq.upsert({
          external_alert_id: alert.weHealthAlert.external_alert_id,
          wh_factor: alert.weHealthAlert.factor,
          wh_level: alert.weHealthAlert.level,
          wh_alert_issue_date: alert.weHealthAlert.alert_issued_date,
          wh_event_start_time: alert.weHealthAlert.event_start_date,
          wh_event_end_time: alert.weHealthAlert.event_end_date,
        });

        console.log(up_record.isNewRecord);

        if (created == null) {
          console.log("New alert added");
        } else {
          console.log("Alert updated");
        }
      } catch (error) {
        console.error("Failed to upsert", alert, error);
      }
    }
  }
}
