import { FC, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductVariations.module.scss";
import { FaSplotch } from "react-icons/fa";
import { IProduct } from "@/app/types/product.interface";
import { rewiews } from "@/app/data/rewiew.data";
import { IProductRatingProps } from "@/app/types/product-rating.interface";

const ProductRating: FC<IProductRatingProps> = ({ reviews }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Вычисляем средний рейтинг при изменении отзывов
    if (reviews.length > 0) {
      const average =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRating(average);
    }
  }, [reviews]);

  const customIcons = Array.from({ length: 5 }, (_, i) => ({
    icon: (
      <FaSplotch
        key={i}
        style={{
          display: "inline-block",
          marginRight: 8,
          verticalAlign: "middle",
          width: 25,
          height: 25,
        }}
      />
    ),
  }));

  return (
    <div className={styles.rating}>
      <Rating
        customIcons={customIcons}
        SVGstyle={{
          display: "inline-block",
          width: 35,
          height: 35,
        }}
        fillColor="#568E73"
        initialValue={rating}
        /* Available Props */
      />
    </div>
  );
};

export default ProductRating;
