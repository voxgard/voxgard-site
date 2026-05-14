import data from "./roi.json";

export type RoiConfig = {
  lowPerCall: number;
  highPerCall: number;
  defaultMissed: number;
  minMissed: number;
  maxMissed: number;
  captureRate: string;
  liveIn: string;
  subtitle: string;
  footnote: string;
};

export const roi: RoiConfig = data;
