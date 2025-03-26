import { FC } from "react";
import cn from "clsx";
import { useActions } from "@/app/hooks/useActions";
import { IProduct } from "@/app/types/product.interface";
import styles from "../Carousel.module.scss";

const Sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];

const CarouselVariations: FC = () => {
  return (
    <div className={styles.variations}>
      {Sizes.map((size) => (
        <button key={size}>{size}</button>
      ))}
    </div>
  );
};
export default CarouselVariations;
