"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { api } from "@/utils/api";
import React from "react";

interface DeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, onSuccess }: DeleteButtonProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully");

      onSuccess?.();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Trash2 size={16} />
    </Button>
  );
}
