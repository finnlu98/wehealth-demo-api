import { Awareness } from "./Awareness.js";
import { Event } from "./Event.js";
import { Municipality } from "./Municipality.js";
import { County } from "./County.js";

export class Alert {
  id: String;
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
  title: String;
  start_time: Date;
  end_time: Date;
  municipality: [Municipality];
  county: [County];
}
