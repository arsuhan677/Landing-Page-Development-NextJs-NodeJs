import { number, string } from "zod";

export interface Review {
    id: string;
    name: string;
    title: string;
    description: number;
    rating: number;
}