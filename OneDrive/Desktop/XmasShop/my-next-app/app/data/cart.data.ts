import { ICartItem } from "@/app/types/cart-item.interface";
import { products } from "./product.data";

export const cart: ICartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: products[0],
    size: "GRANDE",
  },
  {
    id: 2,
    quantity: 1,
    product: products[1],
    size: "GRANDE",
  },
  {
    id: 3,
    quantity: 1,
    product: products[2],
    size: "GRANDE",
  },
  {
    id: 4,
    quantity: 1,
    product: products[3],
    size: "GRANDE",
  },
];
