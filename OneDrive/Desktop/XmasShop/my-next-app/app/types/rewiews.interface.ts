import { IProduct } from "./product.interface";

export interface IRewiew {
  id: number;
  product: IProduct;
  text: string;
  rating: number;
}
