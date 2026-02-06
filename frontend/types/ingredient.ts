import { number, string } from "zod";

export interface Ingredient {
  id: string;
  title: string;
  description: string;
}