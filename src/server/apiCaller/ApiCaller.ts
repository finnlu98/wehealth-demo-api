import fetch from "node-fetch";
import { MetAlerts } from "../converter/MetAlerts.js";
import { IWeHealthAlert } from "../../models/WehealthAlert.js";
import { Alert as AlertModel } from "../../models/Alert.js";
import { Alert as AlertSeq } from "../../db/models/Alert.js";

// TODO: fix hardcoded urls

class ApiCaller {
  header_request: string;
  current_alerts_url: string;

  constructor() {
    this.header_request = "wehealth.org finn.griggs@wehealth.org";
    this.current_alerts_url =
      // REAL DATA
      //"https://api.met.no/weatherapi/metalerts/2.0/current.json?geographicDomain=land&lang=en";

      // TEST DATA
      "https://api.met.no/weatherapi/metalerts/2.0/test.json?geographicDomain=land&lang=en";
  }

  async getCurrentAlerts(): Promise<MetAlerts | null> {
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
    } catch (error) {
      console.error("Error fetching data", error);
      return null;
    }
  }

  isMetAlerts(data: any): data is MetAlerts {
    return data && typeof data === "object" && Array.isArray(data.features);
  }

  async setWehealthAlerts(wehealth_alerts: AlertModel[]): Promise<void> {
    console.log("------- QUERY SET LOGIC TO WEHEALTH API");

    for (const alert of wehealth_alerts) {
      console.log(
        `${new Date()}: Set request to wehealth API with params -`,
        alert.weHealthAlert
      );
    }
  }

  async updateWehealthAlerts(wehealth_alerts: AlertModel[]): Promise<void> {
    console.log("------- QUERY UPDATE LOGIC TO WEHEALTH API");

    for (const alert of wehealth_alerts) {
      console.log(
        `${new Date()}: Update request to wehealth API with params -`,
        alert.weHealthAlert
      );
    }
  }

  async deleteWehealthAlerts(): Promise<void> {}

  // Probably want a getter too
}

export default ApiCaller;
