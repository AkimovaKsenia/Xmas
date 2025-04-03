import { IRewiew } from "./rewiews.interface";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IRewiew[];
  images: string[];
}
export type sortType = "oldest" | "newest" | "low-to-high" | "high-to-low";
