"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditButtonProps {
  id: string;
}

export default function EditButton({ id }: EditButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(`/dashboard/usage/${id}/edit`)}
      className="flex items-center gap-2"
    >
      <Pencil size={16} />
    </Button>
  );
}
