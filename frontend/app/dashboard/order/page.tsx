"use client";

import React, { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { OrderCard } from "./components/OrderCard";
import { api } from "@/utils/api";

export default function Page() {
  const [orders, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/orders");
        if (Array.isArray(res.data)) {
          setOrder(res.data);
        } else if (Array.isArray(res.data.data)) {
          setOrder(res.data.data);
        } else {
          setOrder([]);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setOrder([]);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl font-semibold">All Orders</h2>
          <p className="text-sm">
            This is the all order collection's
          </p>
        </div>
      </div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))
      ) : (
        <p className="text-center text-gray-500">No order found</p>
      )}
    </div>
  );
}
