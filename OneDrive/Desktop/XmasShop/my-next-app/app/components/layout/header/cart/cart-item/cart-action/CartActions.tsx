import { ICartItem } from "@/app/types/cart-item.interface";
import {
  Badge,
  Card,
  InputNumber,
  Select,
  Space,
  Cascader,
  Button,
} from "antd";
import Image from "next/image";
import { FC, useState } from "react";
import styles from "../../Cart.module.scss";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "@/app/store/cart/cart.slice";
import { useActions } from "@/app/hooks/useActions";
import { useCart } from "@/app/hooks/useCart";
import CartItem from "../CartItem";
const CartAction: FC<{ item: ICartItem }> = ({ item }) => {
  const { Option } = Select;
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const { removeFromCart, changeQuantity } = useActions();
  const { cart } = useCart();
  return (
    <Space direction="vertical" align="center">
      <div className={styles.inputContainer}>
        <Button
          onClick={() => {
            changeQuantity({ id: item.id, type: "minus" });
            decreaseQuantity();
          }}
          className={styles.controlButton}
          size="middle"
        >
          -
        </Button>
        <InputNumber
          // min={1}
          value={cart.find((CartItem) => CartItem.id == item.id)?.quantity}
          onChange={(value) => setQuantity(value || 1)}
          style={{ width: 50, textAlign: "center" }}
        />
        <Button
          onClick={() => {
            changeQuantity({ id: item.id, type: "plus" });
            increaseQuantity();
          }}
          className={styles.controlButton}
          size="middle"
        >
          +
        </Button>
      </div>
      <div className={styles.removeButton}>
        <Button
          className={styles.linkButton}
          variant="link"
          onClick={() => removeFromCart({ id: item.id })}
        >
          Remove
        </Button>
      </div>
    </Space>
  );
};
export default CartAction;
