//import { header_request, current_alerts_url } from "./apiUrls.js";
import fetch from "node-fetch";
class ApiCaller {
    constructor() {
        this.header_request = "wehealth.org finn.griggs@wehealth.org";
        this.current_alerts_url =
            "https://api.met.no/weatherapi/metalerts/2.0/current.json?geographicDomain=land";
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
            return await res.json();
        }
        catch (error) {
            console.error("Error fetching data", error);
            return null;
        }
    }
}
export default ApiCaller;
//# sourceMappingURL=ApiCaller.js.map