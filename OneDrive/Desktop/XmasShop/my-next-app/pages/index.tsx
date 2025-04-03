import Home from "@/app/components/screens/home/Home";
import { NextPage, GetStaticProps } from "next";
import "../styles/globals.scss";
import { IProduct } from "@/app/types/product.interface";
import { ProductService } from "@/app/services/ProductService";

export interface IProductPage {
  products: IProduct[];
}

const HomePage: NextPage<IProductPage> = ({ products }) => {
  return <Home products={products} />;
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
