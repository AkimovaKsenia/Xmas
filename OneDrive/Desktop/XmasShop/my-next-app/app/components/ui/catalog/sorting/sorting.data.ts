import { EnumSorting, ISortingItem } from "./sorting.interface";

export const sortingData: ISortingItem[] = [
  {
    label: "Low to high",
    value: EnumSorting.LOW_TO_HIGH_PRICE,
  },
  {
    label: "High to low",
    value: EnumSorting.HIGH_TO_LOW_PRICE,
  },
];
