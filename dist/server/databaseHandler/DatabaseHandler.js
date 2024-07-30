import { Alert as AlertSeq } from "../../db/models/Alert.js";
export default class DatabaseHandler {
    constructor(alerts) {
        this.currentAlerts = alerts;
    }
    // MVP: find and then create
    // SPLIT FUNCTION!
    async processNewAlerts() {
        let new_alerts = [];
        let updated_alerts = [];
        for (const alert of this.currentAlerts) {
            try {
                const cur_alert = await AlertSeq.findByPk(alert.weHealthAlert.external_alert_id);
                if (!cur_alert) {
                    // create record
                    const new_alert = await AlertSeq.create({
                        external_alert_id: alert.weHealthAlert.external_alert_id,
                        wh_title: alert.weHealthAlert.wh_title,
                        wh_factor: alert.weHealthAlert.factor,
                        wh_level: alert.weHealthAlert.level,
                        wh_alert_issue_date: alert.weHealthAlert.alert_issued_date,
                        wh_event_start_time: alert.weHealthAlert.event_start_date,
                        wh_event_end_time: alert.weHealthAlert.event_end_date,
                    });
                    console.log(`${new Date()}: Found new ${alert.weHealthAlert.factor} alert!`);
                    new_alerts.push(alert);
                }
                else {
                    cur_alert.update({
                        wh_title: alert.weHealthAlert.wh_title,
                        wh_factor: alert.weHealthAlert.factor,
                        wh_level: alert.weHealthAlert.level,
                        wh_alert_issue_date: alert.weHealthAlert.alert_issued_date,
                        wh_event_start_time: alert.weHealthAlert.event_start_date,
                        wh_event_end_time: alert.weHealthAlert.event_end_date,
                    });
                    if (cur_alert.changed() != false) {
                        console.log(`${new Date()}: Found update to ${alert.weHealthAlert.factor} alert!`);
                        updated_alerts.push(alert);
                    }
                }
            }
            catch (error) {
                console.error("Failed to upsert", alert, error);
            }
        }
        return [new_alerts, updated_alerts];
    }
    // Divide into smaller task
    async finAndSetNewAlert(alert) { }
    // Divide into smaller task
    async updateAlert() { }
}
//# sourceMappingURL=DatabaseHandler.js.map