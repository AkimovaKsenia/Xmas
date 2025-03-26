import { FC } from "react";
import Carousel from "./carousel/Carousel";
import { IProduct } from "@/app/types/product.interface";

const Catalog: FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div>
      <Carousel products={products} />
    </div>
  );
};
export default Catalog;
