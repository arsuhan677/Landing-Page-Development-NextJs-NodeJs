"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import AfterPage from "./components/AfterBefor";
import { AfterBefor } from "@/types/afterbefor";

export default function AfterBeforPage() {
  const [afterbefor, setAfterbefor] = useState<AfterBefor[]>([]);

  const fetchAfterBefor = async () => {
    try {
      const res = await api.get("/afterbefor");
      setAfterbefor(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAfterBefor();
  }, []);

  return (
    <div className="space-y-4 container mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">All After-Before Gallery</h2>
          <p className="text-sm">This is the complete After-Before gallery</p>
        </div>
        <div>
          <Link href="/dashboard/beforafter/create">
            <Button>Add New After-Before</Button>
          </Link>
        </div>
      </div>

      {/* Gallery List */}
      <div className="space-y-4">
        {afterbefor.map((item) => (
          <AfterPage afterBefor={item} key={item.id} refetch={fetchAfterBefor} />
        ))}
      </div>
    </div>
  );
}
