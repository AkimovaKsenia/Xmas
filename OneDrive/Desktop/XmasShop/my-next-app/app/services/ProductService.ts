import { axiosClassic } from "../api/api";
import { EnumSorting } from "../components/ui/catalog/sorting/sorting.interface";
import { IProduct, sortType } from "../types/product.interface";

const PRODUCTS = "products";
export const ProductService = {
  async getProducts(type?: EnumSorting) {
    const { data } = await axiosClassic.get<IProduct[]>(PRODUCTS, {
      params: {
        sortType: type,
      },
    });
    return data.map((product) => ({
      ...product,
      reviews: product.reviews || [], // Добавляем пустой массив, если reviews нет
    }));
  },
  async bySearchTerm(searchTerm: string) {
    return axiosClassic.get<IProduct[]>(`${PRODUCTS}/search`, {
      params: { searchTerm },
    });
  },
  async byId(id: number) {
    return axiosClassic.get<IProduct>(`${PRODUCTS}/${id}`);
  },
  async getRelatives(withoutId: number) {
    return axiosClassic.get<IProduct[]>(`${PRODUCTS}/relatives/${withoutId}`);
  },
};
