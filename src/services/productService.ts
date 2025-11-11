import { apiClient } from "./apiClient";

export type Product = {
  _id: string;
  title: string;
  description: string;
  prix: number;
  stock?: number;
  category?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};

type ProductsResponse = {
  success: boolean;
  data: Product[];
};

type ProductResponse = {
  success: boolean;
  data: Product;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<ProductsResponse>("/products");
  return data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<ProductResponse>(`/products/${id}`);
  return data.data;
};

