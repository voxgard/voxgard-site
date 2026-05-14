import data from "./addons.json";

export type Addon = {
  id: string;
  name: string;
  price: string;
  pricePerMonth: number;
  unit: string;
  desc: string;
  comingSoon?: boolean;
};

export const addons: Addon[] = data;
