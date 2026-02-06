import { number, string } from "zod";

export interface Hero {
    id: string;
    title: string;
    price: number;
    discount: number;
    image: string;
    subtitle: string;
    description: string;
    rating: string;
}