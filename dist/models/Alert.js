import { WehealthAlert } from "./WehealthAlert.js";
export class Alert {
    // TODO: add validation
    constructor(id, awareness_response, awareness_seriousness, awareness, awareness_type, certainty, consequences, contact, description, event, instruction, severity, status, title, start_time, end_time, municipality, county) {
        this.id = id;
        this.awareness_response = awareness_response;
        this.awareness_seriousness = awareness_seriousness;
        this.awareness = awareness;
        this.awareness_type = awareness_type;
        this.certainty = certainty;
        this.consequences = consequences;
        this.contact = contact;
        this.description = description;
        this.event = event;
        this.instruction = instruction;
        this.severity = severity;
        this.status = status;
        this.title = title;
        this.start_time = start_time;
        this.end_time = end_time;
        this.municipality = municipality;
        this.county = county;
        this.weHealthAlert = new WehealthAlert(this.id, this.event.event, this.awareness.awareness_level, this.start_time, this.end_time, [] // PLACEHOLDER FOR COMMUNITY
        );
    }
}
//# sourceMappingURL=Alert.js.map