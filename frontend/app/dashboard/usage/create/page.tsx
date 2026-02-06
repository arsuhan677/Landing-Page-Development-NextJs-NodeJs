import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateUsage from "../components/CreateUsage";


export default function page() {
  return (
    <div>
       <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Create Usages</CardTitle>
            </CardHeader>
        <CreateUsage />
      </Card>
    </div>
  );
}
