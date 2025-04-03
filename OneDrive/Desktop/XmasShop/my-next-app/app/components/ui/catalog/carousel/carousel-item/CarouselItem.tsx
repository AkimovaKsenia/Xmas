import { IProduct } from "@/app/types/product.interface";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "../Carousel.module.scss";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import CarouselButton from "./CarouselButton";
import CarouselVariations from "./CarouselVariations";
import { TypeSize } from "@/app/store/cart/cart.types";
import { useCarousel } from "./useCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { FaSnowflake, FaStar, FaRegStar, FaSplotch } from "react-icons/fa";
import ProductRating from "../product/ProductRating";
import { rewiews } from "@/app/data/rewiew.data";
import Link from "next/link";
import ProductCard from "../product/ProductCard";

interface ICarouselItem {
  index: number;
  product: IProduct;
}

const CarouselItem: FC<ICarouselItem> = ({ product, index }) => {
  const [selectedSize, setSelectedSize] = useState<TypeSize>("GRANDE");
  // const isActive = product.id == 2;
  const { SelectSlide, addToCart } = useActions();
  const { selectedItemIndex } = useCarousel();
  const isActive = index == selectedItemIndex;
  const [isHovered, setIsHovered] = useState(false); // Добавлено состояние для отслеживания наведения
  const [isProductCardOpen, setIsProductCardOpen] = useState(false);

  // Добавлен массив снежинок
  const snowflakes = Array(5).fill(0);
  // Закрываем модальное окно при деактивации элемента
  useEffect(() => {
    if (!isActive) {
      setIsProductCardOpen(false);
    }
  }, [isActive]);
  return (
    <motion.button
      className={cn(styles.item, { [styles.active]: isActive })}
      onMouseEnter={() => {
        SelectSlide(index);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      // whileHover={{ scale: 1.03 }}
      transition={{ type: "tween", stiffness: 300, duration: 0.6 }}
      // initial={{ opacity: 0.8, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 1,
        scale: isActive ? 1.01 : 0.95,
        y: isActive ? "-5%" : "0%", // Добавляем подъем вверх
      }}
      exit={{ opacity: 0.8, scale: 0.95 }}
    >
      {/* Волшебные снежинки */}
      <AnimatePresence>
        {isHovered &&
          snowflakes.map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              initial={{ opacity: 0, y: -10, x: Math.random() * 40 - 20 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, 60],
                x: Math.random() * 40 - 20,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                top: -10,
                left: `${Math.random() * 100}%`,
                color: "#FFFDCE",
                zIndex: 10,
              }}
            >
              <FaSplotch size={12} />
            </motion.div>
          ))}
      </AnimatePresence>
      <div>
        <Image
          className={styles.image}
          // src={`/products/${encodeURIComponent(product.images[0].trim())}`}
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
        />
        <div className={styles.heading}>{product.name}</div>

        {isActive ? (
          <>
            {/* <ProductRating reviews={rewiews} /> */}
            <CarouselVariations
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
            <button
              onClick={() => setIsProductCardOpen(true)}
              className="absolute cursor-pointer transform -translate-x-1/2 mt-0.5  opacity-80 text-[10px] italic text-white "
            >
              More information...
            </button>
            <CarouselButton product={product} selectedSize={selectedSize} />
          </>
        ) : (
          <div className={styles.description}>{product.description}</div>
        )}
        {isProductCardOpen && (
          <ProductCard
            index={index}
            product={product}
            onClose={() => setIsProductCardOpen(false)}
          />
        )}
      </div>
    </motion.button>
  );
};
export default CarouselItem;
