import { IProduct } from "@/app/types/product.interface";
import { FC, useState } from "react";
import CarouselItem from "./carousel-item/CarouselItem";
import styles from "./Carousel.module.scss";

const Carousel: FC<{ products: IProduct[] }> = ({ products }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  const nextHandler = () => {
    if (selectedItemIndex !== products.length - 1)
      setSelectedItemIndex(selectedItemIndex + 1);
  };
  const prevHandler = () => {
    if (selectedItemIndex > 0) setSelectedItemIndex(selectedItemIndex - 1);
  };
  return (
    <section className={styles.carousel}>
      {products.map((product, index) => (
        <CarouselItem
          product={product}
          key={product.id}
          isActive={index == selectedItemIndex}
          selectItem={() => setSelectedItemIndex(index)}
        />
      ))}
    </section>
  );
};
export default Carousel;
