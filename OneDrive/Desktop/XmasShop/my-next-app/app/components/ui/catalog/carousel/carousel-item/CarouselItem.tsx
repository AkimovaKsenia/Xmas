import { IProduct } from "@/app/types/product.interface";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "../Carousel.module.scss";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import CarouselButton from "./CarouselButton";
import CarouselVariations from "./CarouselVariations";
import { TypeSize } from "@/app/store/types";

interface ICarouselItem {
  isActive: boolean;
  selectItem: () => void;
  product: IProduct;
}

const CarouselItem: FC<ICarouselItem> = ({ product, isActive, selectItem }) => {
  const [selectedSize, setSelectedSize] = useState<TypeSize>("GRANDE");
  // const isActive = product.id == 2;
  const { addToCart } = useActions();
  return (
    <button
      className={cn(styles.item, { [styles.active]: isActive })}
      onMouseEnter={selectItem}
    >
      <div>
        <Image
          className={styles.image}
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
        />
        <div className={styles.heading}>{product.name}</div>
        {isActive ? (
          <>
            <CarouselVariations
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
            <CarouselButton product={product} selectedSize={selectedSize} />
          </>
        ) : (
          <div className={styles.description}>{product.description}</div>
        )}
      </div>
    </button>
  );
};
export default CarouselItem;
