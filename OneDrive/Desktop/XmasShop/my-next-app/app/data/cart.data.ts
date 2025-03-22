import { ICartItem } from "@/app/types/cart-item.interface";
import { products } from "./product.data";

export const cart: ICartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: products[0],
  },
  {
    id: 2,
    quantity: 3,
    product: products[1],
  },
  {
    id: 3,
    quantity: 3,
    product: products[2],
  },
];
