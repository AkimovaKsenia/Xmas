import { FC } from "react";
import Header from "../../layout/header/Header";
import Catalog from "../../ui/catalog/Catalog";
import { products } from "@/app/data/product.data";
import Layout from "../../layout/meta/Layout";
import Heading from "../../ui/heading/Heading";
import Sorting from "../../ui/catalog/sorting/Sorting";
import Stars from "./Stars";

const Home: FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Stars />
      <Header /> {/* 🔹 Вставляем Header */}
      <Layout>
        {/* <div className="text-3xl font-bold text-green-300">Tailwind</div> */}
        <Heading className="text-right">The happiest hour of the year</Heading>
        <Catalog products={products} />
      </Layout>
    </div>
  );
};

export default Home;
