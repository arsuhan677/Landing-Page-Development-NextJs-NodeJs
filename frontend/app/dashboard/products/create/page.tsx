// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import ImageUpload from "@/components/image-upload";
// import { UploadImageToFirebase } from "@/lib/firebase-upload";

// interface ProductFormProps {
//   product?: {
//     id?: number;
//     name: string;
//     price: number;
//     description: string;
//     image: string | null;
//     stock: boolean;
//     is_active: boolean;
//   };
// }

// export function ProductForm({ product }: ProductFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [name, setName] = useState(product?.name || "");
//   const [price, setPrice] = useState(product?.price || 0);
//   const [description, setDescription] = useState(product?.description || "");
//   const [stock, setStock] = useState(product?.stock ?? true);
//   const [isActive, setIsActive] = useState(product?.is_active ?? true);
//   const [file, setFile] = useState<File | null>(null);
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       let imageUrl = product?.image || "";

//       if (file) {
//         setIsUploading(true);
//         imageUrl = await UploadImageToFirebase(file, "products");
//         setIsUploading(false);
//       }

//       const productData = {
//         name,
//         price,
//         description,
//         stock,
//         is_active: isActive,
//         image: imageUrl || "",
//       };

//       const method = product?.id ? "PATCH" : "POST";
//       const endpoint = product?.id ? `/api/products/${product.id}` : "/api/products";

//       const res = await fetch(endpoint, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productData),
//       });

//       if (!res.ok) throw new Error("Failed to save product");

//       toast({
//         title: "Success",
//         description: product ? "Product updated" : "Product created",
//       });

//       router.push("/dashboard/products");
//     } catch (error) {
//       console.error(error);
//       toast({ title: "Error", description: "Failed to save product", variant: "destructive" });
//     } finally {
//       setIsSubmitting(false);
//       setIsUploading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader>
//           <CardTitle>{product ? "Edit" : "Create"} Product</CardTitle>
//           <CardDescription>{product ? "Update product info" : "Fill details to create product"}</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label>Name *</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>

//           <div className="space-y-2">
//             <Label>Description *</Label>
//             <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//           </div>

//           <div className="space-y-2">
//             <Label>Price *</Label>
//             <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
//           </div>

//           <div className="flex gap-4 items-center">
//             <Label>Stock:</Label>
//             <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} />
//             <Label>Active:</Label>
//             <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
//           </div>

//           <ImageUpload
//             label="Product Image"
//             value={product?.image || ""}
//             disabled={isUploading || isSubmitting}
//             onFileSelected={setFile}
//           />
//         </CardContent>
//         <CardFooter className="flex gap-2">
//           <Button type="submit" disabled={!name || isSubmitting || isUploading}>
//             {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : product ? "Update" : "Create"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }


"use client";

import { ProductForm } from "@/components/ProductForm"; // correct path
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function CreateProductPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div>
                <h1 className="text-3xl font-bold">Create Product</h1>
                <p className="text-muted-foreground mt-1">
                  Add a new product
                </p>
              </div>

              <div className="max-w-2xl">
                <ProductForm />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

