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
import { FC } from "react";
import styles from "../../Cart.module.scss";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { cartSlice } from "@/app/store/slice";
import { useActions } from "@/app/hooks/useActions";

const CartAction: FC<{ item: ICartItem }> = ({ item }) => {
  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="add" style={{ width: 10 }}>
      <Option value="add">+</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue="minus" style={{ width: 10 }}>
      <Option value="-">₽</Option>
    </Select>
  );
  const { removeFromCart } = useActions();
  return (
    <Space direction="vertical">
      <InputNumber
        className={styles.inputContainer}
        style={{ width: 100, marginTop: 17 }} // Уменьшаем ширину
        addonBefore="-"
        addonAfter="+"
        defaultValue={1}
      />
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
