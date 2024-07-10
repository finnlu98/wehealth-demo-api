import { Awareness } from "./Awareness.js";
import { Event } from "./Event.js";
import { Municipality } from "./Municipality.js";
import { County } from "./County.js";
import { WehealthAlert } from "./WehealthAlert.js";

export class Alert {
  // Data from MET API
  id: string;
  awareness_response: String;
  awareness_seriousness: String;
  awareness: Awareness;
  awareness_type: String;
  certainty: String;
  consequences: String;
  contact: String;
  description: String;
  event: Event;
  instruction: String;
  severity: String;
  status: String;
  title: string;
  start_time: Date;
  end_time: Date;
  municipality: Municipality[];
  county: County[];

  // Wehealth attributes
  weHealthAlert: WehealthAlert;

  // TODO: add validation
  constructor(
    id: string,
    awareness_response: String,
    awareness_seriousness: String,
    awareness: Awareness,
    awareness_type: String,
    certainty: String,
    consequences: String,
    contact: String,
    description: String,
    event: Event,
    instruction: String,
    severity: String,
    status: String,
    title: string,
    start_time: Date,
    end_time: Date,
    municipality: Municipality[],
    county: County[]
  ) {
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

    this.weHealthAlert = new WehealthAlert(
      this.id,
      this.destructureTitle(this.title),
      this.event.event,
      this.awareness.awareness_desc,
      this.start_time,
      this.end_time,
      [] // PLACEHOLDER FOR COMMUNITY
    );
  }

  destructureTitle(title: string): string {
    return title.split(",")[0];
  }
}
