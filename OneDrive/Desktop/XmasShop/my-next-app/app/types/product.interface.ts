import { IRewiew } from "./rewiews.interface";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IRewiew[];
  images: string[];
}
