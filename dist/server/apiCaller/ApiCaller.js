import fetch from "node-fetch";
// TODO: fix hardcoded urls
class ApiCaller {
    constructor() {
        this.header_request = "wehealth.org finn.griggs@wehealth.org";
        this.current_alerts_url =
            // REAL DATA
            //"https://api.met.no/weatherapi/metalerts/2.0/current.json?geographicDomain=land&lang=en";
            // TEST DATA
            "https://api.met.no/weatherapi/metalerts/2.0/test.json?geographicDomain=land&lang=en";
    }
    async getCurrentAlerts() {
        try {
            const res = await fetch(this.current_alerts_url, {
                method: "GET",
                headers: { Authorization: this.header_request },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            // Basic validation to ensure data conforms to MetAlerts interface
            if (!this.isMetAlerts(data)) {
                throw new Error("Invalid response format");
            }
            return data;
        }
        catch (error) {
            console.error("Error fetching data", error);
            return null;
        }
    }
    isMetAlerts(data) {
        return data && typeof data === "object" && Array.isArray(data.features);
    }
    async setWehealthAlerts(wehealth_alerts) {
        console.log("------- QUERY SET LOGIC TO WEHEALTH API");
        for (const alert of wehealth_alerts) {
            console.log(`${new Date()}: Set request to wehealth API with params -`, alert.weHealthAlert);
        }
    }
    async updateWehealthAlerts(wehealth_alerts) {
        console.log("------- QUERY UPDATE LOGIC TO WEHEALTH API");
        for (const alert of wehealth_alerts) {
            console.log(`${new Date()}: Update request to wehealth API with params -`, alert.weHealthAlert);
        }
    }
    async deleteWehealthAlerts() { }
}
export default ApiCaller;
//# sourceMappingURL=ApiCaller.js.map