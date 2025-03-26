import { FC } from "react";
import Header from "../../layout/header/Header";
import Catalog from "../../ui/catalog/Catalog";
import { products } from "@/app/data/product.data";
import Layout from "../../layout/meta/Layout";

const Home: FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Header /> {/* 🔹 Вставляем Header */}
      <Layout>
        {/* <div className="text-3xl font-bold text-green-300">Tailwind</div> */}
        <Catalog products={products} />
      </Layout>
    </div>
  );
};

export default Home;
