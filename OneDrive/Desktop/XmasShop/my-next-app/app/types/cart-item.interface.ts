import { TypeSize } from "../store/types";
import { IProduct } from "./product.interface";

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
  size: TypeSize;
}
