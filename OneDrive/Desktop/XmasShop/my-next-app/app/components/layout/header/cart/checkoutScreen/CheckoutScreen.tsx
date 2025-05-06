import { Button, Card, Divider, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import { formatToCurrency } from "@/app/utils/format-to-currency";
import styles from "./Checkout.module.scss";

const { Title, Text } = Typography;

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { cart, total } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем загрузку данных
    if (cart !== undefined) {
      setLoading(false);

      // Если корзина пуста и мы не пришли со страницы корзины
      if (cart.length === 0 && !router.query.fromCart) {
        router.push("/");
      }
    }
  }, [cart, router]);

  const handleConfirmPayment = () => {
    // Логика обработки оплаты

    router.push("/personal-info"); // Возврат на главную
  };

  if (cart.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <Title level={2}>Order Summary</Title>

      <Card className={styles.orderCard}>
        {cart.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <Text strong>{item.product.name}</Text>
            <Text>
              {item.quantity} × {formatToCurrency(item.product.price)} ={" "}
              {formatToCurrency(item.product.price * item.quantity)}
            </Text>
          </div>
        ))}

        <Divider />

        <div className={styles.totalSection}>
          <Text strong>Subtotal:</Text>
          <Text>{formatToCurrency(total)}</Text>
        </div>
        <div className={styles.totalSection}>
          <Text strong>Shipping:</Text>
          <Text>{formatToCurrency(0)}</Text>
        </div>
        <div className={styles.totalSection}>
          <Text strong>Total:</Text>
          <Text strong>{formatToCurrency(total)}</Text>
        </div>
      </Card>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleConfirmPayment}
        className={styles.payButton}
      >
        Confirm
      </Button>

      <Button
        type="text"
        onClick={() => router.back()}
        className={styles.backButton}
      >
        Back to Cart
      </Button>
    </div>
  );
};

export default CheckoutPage;
