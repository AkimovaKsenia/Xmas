import { IProduct } from "@/app/types/product.interface";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./ProductVariations.module.scss";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import { motion, AnimatePresence } from "framer-motion";
import { FaSnowflake, FaStar, FaRegStar, FaSplotch } from "react-icons/fa";
import ProductRating from "../product/ProductRating";
import { rewiews } from "@/app/data/rewiew.data";
import { IRewiew } from "@/app/types/rewiews.interface";

interface IProductItem {
  index: number;
  product: IProduct;
  onClose: () => void;
}

const ProductCard: FC<IProductItem> = ({ product, index, onClose }) => {
  // const isActive = product.id == 2;
  const reviews = product.reviews || [];
  const { SelectSlide, addToCart } = useActions();
  const [isHovered, setIsHovered] = useState(false); // Добавлено состояние для отслеживания наведения

  return (
    <div
      className={styles.card}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
      <div className={styles.heading}>{product.name}</div>

      <ProductRating reviews={rewiews} />

      <div className={styles.description}>
        {product.reviews.map((review) => (
          <div key={review.id}>
            <ProductRating reviews={[review]} />{" "}
            {/* Передаем массив из одного отзыва */}
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductCard;
