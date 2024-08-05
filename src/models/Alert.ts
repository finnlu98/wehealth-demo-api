import { Awareness } from "./Awareness.js";
import { Event } from "./Event.js";
import { Municipality } from "./Municipality.js";
import { County } from "./County.js";
import { WehealthAlert } from "./WehealthAlert.js";
import { NorwayFactor } from "../db/models/NorwayFactor.js";

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

  // Factor mapping
  factor_mapping: NorwayFactor[];

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
    county: County[],
    factor_mapping: NorwayFactor[]
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

    this.factor_mapping = factor_mapping;

    this.weHealthAlert = new WehealthAlert(
      this.id,
      this.destructureTitle(this.title),
      this.convertToFactor(event.event),
      this.awareness.awareness_desc,
      this.start_time,
      this.end_time,
      this.convertToCommunities()
    );
  }

  destructureTitle(title: string): string {
    try {
      return title.split(",")[0];
    } catch (error) {
      console.error("An error occurred while destructuring the title:", error);
      return title;
    }
  }

  /**
   * TODO:
   * @param factor_mapping
   * @param factor
   * @returns
   */
  convertToFactor(factor: string): string {
    for (const factor_map of this.factor_mapping) {
      if (factor_map.getNoFactor() == factor) {
        return factor_map.getWhFactor();
      }
    }

    return;
  }

  convertToCommunities(): string[] {
    let communities = [];

    for (const municipality of this.municipality) {
      communities.push(
        this.convertToCommunity(municipality.municipality_number.toString())
      );
    }

    return communities;
  }

  convertToCommunity(municipality_number: string): string {
    let converting_number: string = municipality_number;

    // Check for if municipality is Oslo (has only 3 digits)
    if (converting_number.length == 3) {
      converting_number = "0" + converting_number;
    }

    if (converting_number.length != 4) {
      console.error(
        "Error in converting municipality to community: Invalid municipality number"
      );
      return converting_number;
    }

    const county_number = converting_number.substring(0, 2);
    return `NO-${county_number}-${converting_number}`;
  }
}
