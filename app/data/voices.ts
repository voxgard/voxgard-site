import data from "./voices.json";

export type Voice = {
  id: string;
  name: string;
  style: string;
  language: string;
  accent: string;
  durationS: number;
  audioSrc?: string;
  preview: string;
};

export const voices: Voice[] = data;
