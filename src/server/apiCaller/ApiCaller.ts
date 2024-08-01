import fetch from "node-fetch";
import { MetAlerts } from "../converter/MetAlerts.js";
import { Alert as AlertModel } from "../../models/Alert.js";
import { API_URL, HEADER_REQUEST } from "../../config.js";

class ApiCaller {
  header_request: string;
  current_alerts_url: string;

  constructor() {
    this.header_request = HEADER_REQUEST;
    this.current_alerts_url = API_URL;
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
    for (const alert of wehealth_alerts) {
      console.log(
        `${new Date()}: Set request to wehealth API with params -`,
        alert.weHealthAlert
      );
    }
  }

  async updateWehealthAlerts(wehealth_alerts: AlertModel[]): Promise<void> {
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
