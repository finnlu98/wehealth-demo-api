export class WehealthAlert {
    constructor(external_alert_id, wh_title, event, awareness, alert_start_date, alert_end_date, communities) {
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
    formatToApi() {
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
//# sourceMappingURL=WehealthAlert.js.map