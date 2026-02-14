"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, onSuccess }: DeleteButtonProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this hero?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hero/${id}`);
      alert("Hero deleted");

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Failed to delete hero");
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
