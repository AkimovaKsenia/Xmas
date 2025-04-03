import { FC, useState } from "react";
import Carousel from "./carousel/Carousel";
import { IProduct } from "@/app/types/product.interface";
import Sorting from "./sorting/Sorting";
import { EnumSorting } from "./sorting/sorting.interface";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/app/services/ProductService";

const Catalog: FC<{ products: IProduct[] }> = ({ products }) => {
  const [sortType, setSortType] = useState<EnumSorting>(
    EnumSorting.HIGH_TO_LOW_PRICE
  );
  const { data } = useQuery({
    queryKey: ["products", sortType],
    queryFn: () => ProductService.getProducts(sortType),
    initialData: products,
  });

  return (
    <div>
      <div>
        <Sorting sortType={sortType} setSortType={setSortType} />
      </div>
      <Carousel products={data} />
    </div>
  );
};
export default Catalog;
