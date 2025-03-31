import { IProduct } from "./product.interface";

export interface IRewiew {
  id: number;
  productID: number;
  text: string;
  rating: number;
}
