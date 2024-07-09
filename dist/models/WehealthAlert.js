export class WehealthAlert {
    constructor(external_alert_id, event, awareness, alert_start_date, alert_end_date, communities) {
        this.external_alert_id = external_alert_id;
        this.factor = this.convertToFactor(event);
        this.level = awareness;
        this.alert_issued_date = alert_start_date;
        this.alert_expired_date = alert_end_date;
        this.event_start_date = alert_start_date;
        this.event_end_date = alert_end_date;
        this.communities = communities;
    }
    formatToApi() {
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
    convertToFactor(key) {
        const metFactorMapping = {
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
//# sourceMappingURL=WehealthAlert.js.map