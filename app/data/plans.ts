import data from "./plans.json";

export type PricingTier = {
  name: string;
  price: string;
  per: string;
  desc: string;
  features: string[];
  highlight: boolean;
  cta: string;
  ctaHref: string;
};

export const plans: PricingTier[] = data;
