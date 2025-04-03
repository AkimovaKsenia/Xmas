export enum EnumSorting {
  LOW_TO_HIGH_PRICE = "low-to-high",
  HIGH_TO_LOW_PRICE = "high-to-low",
}

export interface ISortingItem {
  label: "High to low" | "Low to high";
  value: EnumSorting;
}
