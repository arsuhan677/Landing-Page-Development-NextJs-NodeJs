import { number, string } from "zod";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: boolean;
  description: string;
  is_active: boolean;
}