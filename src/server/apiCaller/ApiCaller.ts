//import { header_request, current_alerts_url } from "./apiUrls.js";
import fetch from "node-fetch";

// TODO: fix hardcoded urls
// Destructure the call into alerts
// Determine where the storage to DB is handled

class ApiCaller {
  header_request: string;
  current_alerts_url: string;

  constructor() {
    this.header_request = "wehealth.org finn.griggs@wehealth.org";
    this.current_alerts_url =
      "https://api.met.no/weatherapi/metalerts/2.0/current.json?geographicDomain=land";
  }

  async getCurrentAlerts(): Promise<Object> {
    try {
      const res = await fetch(this.current_alerts_url, {
        method: "GET",
        headers: { Authorization: this.header_request },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching data", error);

      return null;
    }
  }

  destructureCurrentAlerts() {
    return;
  }
}

export default ApiCaller;
