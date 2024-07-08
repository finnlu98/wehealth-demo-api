import { Alert } from "../../models/Alert.js";
import { Awareness } from "../../models/Awareness.js";
import { County } from "../../models/County.js";
import { Event } from "../../models/Event.js";
import { Municipality } from "../../models/Municipality.js";
class Converter {
    constructor(current_alerts) {
        this.met_alerts = current_alerts.features;
        this.alerts = [];
        this.destructureCurrentAlerts();
    }
    getAlerts() {
        return this.alerts;
    }
    // iterate through result and create Alert objects
    destructureCurrentAlerts() {
        this.met_alerts.forEach((alert) => {
            this.alerts.push(this.destructureAlert(alert));
        });
    }
    // Should return a model with alert
    destructureAlert(met_alert_meta) {
        const met_alert = met_alert_meta.properties;
        // Awareness
        const awareness = this.destructureAwarenessLevel(met_alert.awareness_level);
        // Event
        const event = new Event(met_alert.event, met_alert.eventAwarenessName);
        // Municipality
        let municipalities = [];
        met_alert.municipality.forEach((municipality) => {
            municipalities.push(new Municipality(municipality));
        });
        // County
        let counties = [];
        met_alert.county.forEach((county) => {
            counties.push(new County(county));
        });
        // start and end time
        const [start_time, end_time] = met_alert_meta.when.interval;
        const alert = new Alert(met_alert.id, met_alert.awarenessResponse, met_alert.awarenessSeriousness, awareness, met_alert.awareness_type, met_alert.certainty, met_alert.consequences, met_alert.contact, met_alert.description, event, met_alert.instruction, met_alert.severity, met_alert.status, met_alert.title, new Date(start_time), new Date(end_time), municipalities, counties);
        console.log(alert.weHealthAlert.formatToApi());
        return alert;
    }
    destructureAwarenessLevel(awareness_level) {
        const [levelStr, color, awareness_desc] = awareness_level.split(";");
        const level = parseInt(levelStr, 10);
        return new Awareness(level, color, awareness_desc);
    }
}
export default Converter;
//# sourceMappingURL=Converter.js.map