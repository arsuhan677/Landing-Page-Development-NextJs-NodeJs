"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { api } from "@/utils/api";

interface DeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, onSuccess }: DeleteButtonProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this productgallery?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/afterbefor/${id}`);

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Failed to delete gallery");
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      className="flex items-center gap-2"
    >
      <Trash2 size={16} />
    </Button>
  );
}
