import { FC } from "react";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import { IProduct } from "@/app/types/product.interface";

const CarouselButton: FC<{ product: IProduct }> = ({ product }) => {
  const { addToCart } = useActions();
  return (
    <Button
      className="mt-15 ml-9 rounded-xl w-30"
      onClick={() =>
        addToCart({
          product,
          quantity: 1,
        })
      }
    >
      Add to Cart
    </Button>
  );
};
export default CarouselButton;
