import { FC, useState } from "react";
import Carousel from "./carousel/Carousel";
import { IProduct } from "@/app/types/product.interface";
import Sorting from "./sorting/Sorting";
import { EnumSorting } from "./sorting/sorting.interface";

const Catalog: FC<{ products: IProduct[] }> = ({ products }) => {
  const [sortType, setSortType] = useState<EnumSorting>(
    EnumSorting.HIGH_TO_LOW_PRICE
  );
  return (
    <div>
      <div>
        <Sorting sortType={sortType} setSortType={setSortType} />
      </div>
      <Carousel products={products} />
    </div>
  );
};
export default Catalog;
