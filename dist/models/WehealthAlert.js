export class WehealthAlert {
    constructor(external_alert_id, wh_title, event, awareness, alert_start_date, alert_end_date, communities) {
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
    formatToApi() {
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
    convertToFactor(key) {
        const metFactorMapping = {
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
    convertToCommunities(municipality_numbers) {
        let communities = [];
        for (const municipality_number of municipality_numbers) {
            communities.push(this.convertToCommunity(municipality_number.toString()));
        }
        return communities;
    }
    convertToCommunity(municipality_number) {
        let converting_number = municipality_number;
        // Check for if municipality is Oslo (has only 3 digits)
        if (converting_number.length == 3) {
            converting_number = "0" + converting_number;
        }
        if (converting_number.length != 4) {
            console.error("Error in converting municipality to community: Invalid municipality number");
            return converting_number;
        }
        const county_number = converting_number.substring(0, 2);
        return `NO-${county_number}-${converting_number}`;
    }
}
//# sourceMappingURL=WehealthAlert.js.map