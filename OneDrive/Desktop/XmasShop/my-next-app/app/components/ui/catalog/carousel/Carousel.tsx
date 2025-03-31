import { IProduct } from "@/app/types/product.interface";
import { FC, useState } from "react";
import CarouselItem from "./carousel-item/CarouselItem";
import styles from "./Carousel.module.scss";

const Carousel: FC<{ products: IProduct[] }> = ({ products }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  return (
    <section className={styles.carousel}>
      {products.map((product, index) => (
        <CarouselItem product={product} key={product.id} index={index} />
      ))}
    </section>
  );
};
export default Carousel;
