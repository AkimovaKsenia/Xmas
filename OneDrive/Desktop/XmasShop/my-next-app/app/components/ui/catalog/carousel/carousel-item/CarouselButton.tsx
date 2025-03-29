import { Dispatch, FC, SetStateAction } from "react";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import { IProduct } from "@/app/types/product.interface";
import { TypeSize } from "@/app/store/types";

interface ICarouselButton {
  product: IProduct;
  selectedSize: TypeSize;
}

const CarouselButton: FC<ICarouselButton> = ({ product, selectedSize }) => {
  const { addToCart } = useActions();
  return (
    <div className="flex justify-center items-center">
      <Button
        className="mt-5 ml-0.1 rounded-xl w-30"
        onClick={() =>
          addToCart({
            product,
            quantity: 1,
            size: selectedSize,
          })
        }
      >
        Add to Cart
      </Button>
    </div>
  );
};
export default CarouselButton;
