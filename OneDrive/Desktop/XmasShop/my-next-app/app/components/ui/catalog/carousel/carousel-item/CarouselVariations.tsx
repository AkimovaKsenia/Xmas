import { Dispatch, FC, SetStateAction } from "react";
import cn from "clsx";
import { useActions } from "@/app/hooks/useActions";
import { IProduct } from "@/app/types/product.interface";
import styles from "../Carousel.module.scss";
import { TypeSize } from "@/app/store/cart/cart.types";
import { useCart } from "@/app/hooks/useCart";

const Sizes: TypeSize[] = ["SHORT", "TALL", "GRANDE", "VENTI"];

interface ICarouselVariations {
  selectedSize: TypeSize;
  setSelectedSize: Dispatch<SetStateAction<TypeSize>>;
}

const CarouselVariations: FC<ICarouselVariations> = ({
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className={styles.variations}>
      {Sizes.map((size) => (
        <button
          key={size}
          className={cn({ [styles.active]: selectedSize == size })}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
export default CarouselVariations;
