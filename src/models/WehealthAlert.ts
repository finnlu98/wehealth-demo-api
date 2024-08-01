export class WehealthAlert {
  //cid: String; // should  be issued by Wehealth server on call

  external_alert_id: string;

  wh_title: string;

  wh_factor: String;
  wh_level: string;

  wh_alert_issued_date: Date;
  wh_alert_expired_date: Date;
  wh_event_start_date: Date;
  wh_event_end_date: Date;

  wh_communities: string[];

  constructor(
    external_alert_id: string,

    wh_title: string,

    event: string,
    awareness: string,

    alert_start_date: Date,
    alert_end_date: Date,
    communities: number[]
  ) {
    this.external_alert_id = external_alert_id;

    this.wh_title = wh_title;

    this.wh_factor = this.convertToFactor(event);
    this.wh_level = awareness;

    this.wh_alert_issued_date = alert_start_date;
    this.wh_alert_expired_date = alert_end_date;
    this.wh_event_start_date = alert_start_date;
    this.wh_event_end_date = alert_end_date;

    this.wh_communities = this.convertToCommunities(communities);
  }

  formatToApi(): IWeHealthAlert {
    return {
      external_alert_id: this.external_alert_id,

      wh_title: this.wh_title,

      factor: this.wh_factor,
      level: this.wh_level,

      alert_issued_date: this.wh_alert_issued_date,
      alert_expired_date: this.wh_alert_expired_date,
      event_start_date: this.wh_event_start_date,
      event_end_date: this.wh_event_end_date,

      communities: this.wh_communities,
    };
  }

  convertToFactor(key: string): string | undefined {
    const metFactorMapping: { [key: string]: string } = {
      blowingSnow: "cold",
      forestFire: "wildfire",
      gale: "cold",
      ice: "cold",
      icing: "cold",
      lightning: "lightning",
      polarLow: "wind",
      rain: "flood",
      rainFlood: "flood",
      snow: "cold",
      stormUsage: "storm",
      wind: "wind",
    };

    return metFactorMapping[key];
  }

  convertToCommunities(municipality_numbers: number[]): string[] {
    let communities = [];

    for (const municipality_number of municipality_numbers) {
      communities.push(this.convertToCommunity(municipality_number.toString()));
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

export interface IWeHealthAlert {
  external_alert_id: string;

  wh_title: string;

  factor: String;
  level: string;

  alert_issued_date: Date;
  alert_expired_date: Date;
  event_start_date: Date;
  event_end_date: Date;

  communities: string[];
}
