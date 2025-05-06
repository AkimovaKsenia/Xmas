import { Button, Card, Form, Input, Typography } from "antd";
import { useRouter } from "next/router";
import styles from "../app/components/layout/header/cart/checkoutScreen/Checkout.module.scss";

const { Title } = Typography;

const PersonalInfoPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // Здесь можно добавить логику обработки данных
    alert("Payment successful! Your order has been placed.");
    router.push("/"); // Переход на главную после оплаты
  };

  return (
    <div className={styles.checkoutContainer}>
      <Title level={2}>Personal Information</Title>

      <Card className={styles.orderCard}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input.TextArea placeholder="123 Main St, City, Country" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="+1 234 567 8900" />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            className={styles.payButton}
          >
            Pay Now
          </Button>
        </Form>
      </Card>

      <Button
        type="text"
        onClick={() => router.back()}
        className={styles.backButton}
      >
        Back to Order Summary
      </Button>
    </div>
  );
};

export default PersonalInfoPage;
