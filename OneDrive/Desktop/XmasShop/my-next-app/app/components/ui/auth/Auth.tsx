"use client";

import { authService } from "@/app/services/auth.service";
import { IAuthForm, IAuthResponse } from "@/app/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation"; // Исправленный импорт
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Auth.module.scss";

export function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const { push } = useRouter();
  const [form] = Form.useForm<IAuthForm>();
  const { mutate } = useMutation<IAuthResponse, Error, IAuthForm>({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? "login" : "register", data),
    onSuccess: (responseData) => {
      if (responseData?.accessToken) {
        // Добавлена проверка
        localStorage.setItem("accessToken", responseData.accessToken);
        toast.success("Успешно!");
        form.resetFields();
        push("/"); // Редирект на главную
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Ошибка!");
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    // Дальше идет отправка запроса
  };

  // Обработка отправки формы
  const onFinish = (values: IAuthForm) => {
    console.log("Form data:", JSON.stringify(values, null, 2)); // Логируем в читаемом формате
    mutate(values);
  };
  return (
    <div className={styles.container}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className={styles.form}
        onFinish={onFinish}
      >
        <div className={styles.content}>
          <Form.Item<IAuthForm>
            className={styles.input}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className={styles.input} />
          </Form.Item>

          <Form.Item<IAuthForm>
            className={styles.input}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className={styles.input} />
          </Form.Item>

          <Form.Item label={null}>
            <div className={styles.buttons}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setIsLoginForm(true)}
              >
                Login
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setIsLoginForm(false)}
              >
                Register
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
