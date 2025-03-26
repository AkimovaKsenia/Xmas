import { IProduct } from "@/app/types/product.interface";
import Image from "next/image";
import { FC } from "react";
import styles from "../Carousel.module.scss";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import CarouselButton from "./CarouselButton";

const CarouselItem: FC<{ product: IProduct }> = ({ product }) => {
  const isActive = product.id == 2;
  const { addToCart } = useActions();
  return (
    <div className={cn(styles.item, { [styles.active]: isActive })}>
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
            <CarouselButton product={product} />
          </>
        ) : (
          <div className={styles.description}>{product.description}</div>
        )}
      </div>
    </div>
  );
};
export default CarouselItem;
