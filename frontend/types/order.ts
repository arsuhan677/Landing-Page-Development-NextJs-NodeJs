import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  total: number;
  mobile: string;
  address: string;
  district: string;
  quantity: number;
  note: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
