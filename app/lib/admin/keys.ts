export type ContentKey =
  | "copy"
  | "plans"
  | "addons"
  | "industries"
  | "voices"
  | "roi"
  | "theme";

export const CONTENT_KEYS: ContentKey[] = [
  "copy",
  "plans",
  "addons",
  "industries",
  "voices",
  "roi",
  "theme",
];

export const CONTENT_LABELS: Record<ContentKey, string> = {
  copy: "Copy (Hero / Flow / CTA)",
  plans: "Pricing plans",
  addons: "Add-ons",
  industries: "Industries",
  voices: "Voice cast",
  roi: "ROI calculator",
  theme: "Theme tokens",
};

export const CONTENT_DESCRIPTIONS: Record<ContentKey, string> = {
  copy: "Hero headline, paragraph, CTAs and other text strings.",
  plans: "Starter / Growth / Scale plans — price, features, CTA.",
  addons: "Modular add-ons (premium voices, multilingual, CRM, etc).",
  industries: "Industries chip strip and accent colors.",
  voices: "Voice cast cards (Aurora, Lyra, Nova, Sofia).",
  roi: "Calculator defaults — per-call value, capture rate, range.",
  theme: "Brand color tokens — blue / violet / cyan / navy.",
};
