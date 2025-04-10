import Home from "@/app/components/screens/home/Home";
import { NextPage, GetStaticProps } from "next";
import "../styles/globals.scss";
import { IProduct } from "@/app/types/product.interface";
import { ProductService } from "@/app/services/ProductService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface IProductPage {
  products: IProduct[];
}

const HomePage: NextPage<IProductPage> = ({ products }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Добавляем состояние для загрузки

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/auth");
    } else {
      setLoading(false); // Устанавливаем состояние в false после проверки
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Отображаем индикатор загрузки, пока идет проверка
  }

  return <Home products={products} />;
  // return <Home products={products} />;
};

export const getStaticProps: GetStaticProps<IProductPage> = async () => {
  const products = await ProductService.getProducts();
  return {
    props: {
      products,
    },
  };
};

export default HomePage;
