import data from "./industries.json";

export type Industry = {
  name: string;
  accent: string;
  blurb: string;
  points: string[];
};

export const industries: Industry[] = data;
