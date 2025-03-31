import { FC, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductVariations.module.scss";
import { FaSplotch } from "react-icons/fa";
import { IProduct } from "@/app/types/product.interface";
import { rewiews } from "@/app/data/rewiew.data";
import { IProductRatingProps } from "@/app/types/product-rating.interface";

const ProductRating: FC<IProductRatingProps> = ({ reviews }) => {
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const [rating, setRating] = useState(calculateAverageRating());

  // Обновляем рейтинг при изменении отзывов
  useEffect(() => {
    setRating(calculateAverageRating());
  }, [reviews]);
  const customIcons = Array.from({ length: 5 }, (_, i) => ({
    icon: (
      <FaSplotch
        key={i}
        style={{
          display: "inline-block", // Изменено на inline-block
          marginRight: 8, // Добавлен отступ между иконками
          verticalAlign: "middle",
          width: 25,
          height: 25,
        }}
      />
    ),
  }));

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <div className={styles.rating}>
      <Rating
        customIcons={customIcons}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
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
