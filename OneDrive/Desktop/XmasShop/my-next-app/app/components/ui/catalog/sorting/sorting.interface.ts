export enum EnumSorting {
  LOW_TO_HIGH_PRICE = "LOW_TO_HIGH_PRICE",
  HIGH_TO_LOW_PRICE = "HIGH_TO_LOW_PRICE",
}

export interface ISortingItem {
  label: "High to low" | "Low to high";
  value: EnumSorting;
}
