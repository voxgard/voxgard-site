export type Package = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  includes: string[];
  accent: string;
};

export const packages: Package[] = [
  {
    id: "after-hours",
    name: "After-hours pack",
    tagline: "Catch calls when you can't",
    blurb:
      "Routes only outside business hours. Voicemails become bookings. Emergency triage built in.",
    includes: [
      "Out-of-hours routing",
      "Emergency escalation rules",
      "Morning summary digest",
    ],
    accent: "#6FA8E8",
  },
  {
    id: "multilingual",
    name: "Multilingual pack",
    tagline: "Speak every patient's language",
    blurb:
      "Native English plus Spanish, French, Mandarin and 27 more. Auto language detection on pick-up.",
    includes: [
      "30+ languages",
      "Auto-detect on first phrase",
      "Per-language scripts",
    ],
    accent: "#9B8FE0",
  },
  {
    id: "healthcare",
    name: "Healthcare pack",
    tagline: "HIPAA-ready intake",
    blurb:
      "Medical-trained vocabulary, insurance triage prompts, BAA-signed infrastructure.",
    includes: [
      "HIPAA controls + signed BAA",
      "Insurance triage flow",
      "Patient intake forms",
    ],
    accent: "#7CC9DC",
  },
  {
    id: "outbound",
    name: "Outbound pack",
    tagline: "Re-engage without lifting a finger",
    blurb:
      "Lapsed-customer recall, lead nurturing and confirmation campaigns — all autonomous.",
    includes: [
      "Outbound campaign engine",
      "Recall + nurture flows",
      "Reply-aware retries",
    ],
    accent: "#B5A0E5",
  },
];
