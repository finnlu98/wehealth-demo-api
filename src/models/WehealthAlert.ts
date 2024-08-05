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
    communities: string[]
  ) {
    this.external_alert_id = external_alert_id;

    this.wh_title = wh_title;

    this.wh_factor = event;
    this.wh_level = awareness;

    this.wh_alert_issued_date = alert_start_date;
    this.wh_alert_expired_date = alert_end_date;
    this.wh_event_start_date = alert_start_date;
    this.wh_event_end_date = alert_end_date;

    this.wh_communities = communities;
  }

  formatToApi(): IWeHealthAlert {
    return {
      external_alert_id: this.external_alert_id,

      wh_title: this.wh_title,

      wh_factor: this.wh_factor,
      wh_level: this.wh_level,

      wh_alert_issued_date: this.wh_alert_issued_date,
      wh_alert_expired_date: this.wh_alert_expired_date,
      wh_event_start_date: this.wh_event_start_date,
      wh_event_end_date: this.wh_event_end_date,

      wh_communities: this.wh_communities,
    };
  }
}

export interface IWeHealthAlert {
  external_alert_id: string;

  wh_title: string;

  wh_factor: String;
  wh_level: string;

  wh_alert_issued_date: Date;
  wh_alert_expired_date: Date;
  wh_event_start_date: Date;
  wh_event_end_date: Date;

  wh_communities: string[];
}
