export class Awareness {
  awareness_level: number;
  color: string;
  awareness_desc: string;

  constructor(awareness_level: number, color: string, awareness_desc: string) {
    this.awareness_level = awareness_level;
    this.color = color;
    this.awareness_desc = awareness_desc;
  }
}
