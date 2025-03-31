import { FC } from "react";
import ProductRating from "./ProductRating";
import { rewiews } from "@/app/data/rewiew.data";

const ProductVariations: FC = () => {
  return (
    <div>
      <ProductRating reviews={rewiews} />
    </div>
  );
};

export default ProductVariations;
