// import { Badge, Button, Card, Drawer, Space } from "antd";
// import { FC, useState } from "react";
// import styles from "./Cart.module.scss";
// import CartItem from "./cart-item/CartItem";
// import { cart } from "@/app/data/cart.data";
// const Cart: FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className={styles["wrapper-cart"]}>
//       <button className={styles.heading} onClick={() => setIsOpen(!isOpen)}>
//         <span className={styles.badge}>1</span>
//         <span className={styles.text}>My Basket</span>
//       </button>
//       {isOpen && (
//         <div className={styles.cart}>
//           {cart.map((item) => (
//             <CartItem item={item} key={item.id} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Cart;

import { Badge, Button, Card, Drawer, Space } from "antd";
import { FC, useState } from "react";
import styles from "./Cart.module.scss";
import CartItem from "./cart-item/CartItem";
import { cart } from "@/app/data/cart.data";
import { useTypedSelector } from "@/app/hooks/useTypedSelector";

const Cart: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useTypedSelector((state) => state.cart.items);
  return (
    <div className={styles["wrapper-cart"]}>
      <Button
        type="primary"
        className={styles.heading}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.badge}>1</span>
        <span className={styles.text}>My Basket</span>
      </Button>

      <Drawer title="My Basket" onClose={() => setIsOpen(false)} open={isOpen}>
        <div className={styles.cart}>
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>

        <div className={styles.button_container}>
          <div className={styles["cart-footer"]}>
            <span>Total:</span>
            <span>1800₽</span>
          </div>
          <Button className={styles.secondary_button}>
            <span className={styles.text}>Checkout</span>
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
export default Cart;
