import { IProduct } from "../types/product.interface";

export const products: IProduct[] = [
  {
    id: 1,
    description: "Calories Total Fat 19g 29% 65%",
    name: "Midnight Mint Frappuccino",
    images: ["/products/MintFrapp.jpg", "/products/Orange.jpg"],
    price: 500,
    reviews: [],
  },
  {
    id: 2,
    description: "Calories Total Fat 19g 29% 65%",
    name: "Strawberries & Cream Frappuccino",
    images: ["/products/PinkDrink.jpg"],
    price: 400,
    reviews: [],
  },
  {
    id: 3,
    description: "Calories Total Fat 19g 29% 65%",
    name: "Java Chip Frappuccino",
    images: ["/products/Orange.jpg"],
    price: 900,
    reviews: [],
  },
];
