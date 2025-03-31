import { Dispatch, FC, SetStateAction } from "react";
import cn from "clsx";
import { Button } from "antd";
import { useActions } from "@/app/hooks/useActions";
import { IProduct } from "@/app/types/product.interface";
import { TypeSize } from "@/app/store/cart/cart.types";
import { useCart } from "@/app/hooks/useCart";

interface ICarouselButton {
  product: IProduct;
  selectedSize: TypeSize;
}

const CarouselButton: FC<ICarouselButton> = ({ product, selectedSize }) => {
  const { addToCart, removeFromCart } = useActions();
  const { cart } = useCart();
  const currentElement = cart.find(
    (cartItem) =>
      cartItem.product.id == product.id && cartItem.size == selectedSize
  );
  return (
    <div className="flex justify-center items-center">
      <Button
        className="mt-5  rounded-xl w-30"
        onClick={() =>
          currentElement
            ? removeFromCart({ id: currentElement.id })
            : addToCart({
                product,
                quantity: 1,
                size: selectedSize,
              })
        }
      >
        {currentElement ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </div>
  );
};
export default CarouselButton;
