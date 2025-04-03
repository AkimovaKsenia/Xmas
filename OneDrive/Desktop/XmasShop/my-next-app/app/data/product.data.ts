import { IProduct } from "../types/product.interface";
import { IRewiew } from "../types/rewiews.interface";
import { rewiews } from "./rewiew.data";

export const products: IProduct[] = [
  {
    id: 1,
    description: "Calories Total Fat 19g 29% 65%",
    name: "Midnight Mint Frappuccino",
    images: ["/products/MintFrapp.jpg", "/products/Orange.jpg"],
    price: 500,
    reviews: [rewiews[1], rewiews[4]],
  },
  {
    id: 2,
    description:
      "Calories Total Fat 19g 29% 65% Whole Milk Whipped Cream Strawberry Purée Classic Syrup pumps",
    name: "Strawberries & Cream Frappuccino",
    images: ["/products/Drink.jpg"],
    price: 400,
    reviews: [rewiews[0], rewiews[1]],
  },
  {
    id: 3,
    description: "Calories Total Fat 19g 29% 65%",
    name: "Cookie Crumble Frappuccino Blended Beverage",
    images: ["/products/ChocoChip.jpg"],
    price: 900,
    reviews: [rewiews[0], rewiews[1]],
  },
  {
    id: 4,
    description:
      "Calories Total Fat 19g 29% 65% Whole Milk Whipped Cream Strawberry Purée Classic Syrup pumps",
    name: "Caramel Ribbon Crunch Frappuccino® Blended Beverage",
    images: ["/products/CookieFrapp.jpg"],
    price: 9800,
    reviews: [rewiews[0], rewiews[1]],
  },
];
