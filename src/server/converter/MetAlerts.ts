export interface MetAlerts {
  features: MetAlertMeta[];
}

export interface MetAlertMeta {
  properties: MetAlert;
  when: {
    interval: string[];
  };
}

export interface MetAlert {
  id: string;
  awarenessResponse: String;
  awarenessSeriousness: String;
  awareness_level: String;
  awareness_type: String;
  certainty: String;
  consequences: String;
  contact: String;
  description: String;
  event: string;
  eventAwarenessName: string;
  instruction: String;
  severity: String;
  status: String;
  title: string;
  municipality: number[];
  county: number[];
}
