export class WehealthAlert {
  //cid: String; // should  be issued by Wehealth server on call

  external_alert_id: String;

  factor: String;
  level: number;

  alert_issued_date: Date;
  alert_expired_date: Date;
  event_start_date: Date;
  event_end_date: Date;

  communities: number[];

  constructor(
    external_alert_id: String,

    event: string,
    awareness: number,

    alert_start_date: Date,
    alert_end_date: Date,
    communities: number[]
  ) {
    this.external_alert_id = external_alert_id;
    this.factor = this.convertToFactor(event);
    this.level = awareness;

    this.alert_issued_date = alert_start_date;
    this.alert_expired_date = alert_end_date;
    this.event_start_date = alert_start_date;
    this.event_end_date = alert_end_date;

    this.communities = communities;
  }

  formatToApi(): IWeHealthAlert {
    return {
      external_alert_id: this.external_alert_id,
      factor: this.factor,
      level: this.level,

      alert_issued_date: this.alert_issued_date,
      alert_expired_date: this.alert_expired_date,
      event_start_date: this.event_start_date,
      event_end_date: this.event_end_date,

      communities: this.communities,
    };
  }

  convertToFactor(key: string): string | undefined {
    const metFactorMapping: { [key: string]: string } = {
      blowingSnow: "cold",
      snow: "cold",
      rain: "flood",
      wind: "wind",
      ice: "cold",
      stormUsage: "storm",
      forestFire: "wildfire",
      lightning: "lightning",
      rainFlood: "flood",
    };

    return metFactorMapping[key];
  }

  convertToCommunities() {
    return;
  }
}

export interface IWeHealthAlert {
  external_alert_id: String;

  factor: String;
  level: number;

  alert_issued_date: Date;
  alert_expired_date: Date;
  event_start_date: Date;
  event_end_date: Date;

  communities: number[];
}
