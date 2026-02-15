// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { UploadImage } from "@/lib/image-upload";

// interface ProductFormProps {
//   product?: {
//     id: number;
//     name: string;
//     image: string;
//     price: number;
//     discount?: number;
//     stock: boolean;
//     description: string;
//     is_active: boolean;
//   };
// }

// export function ProductForm({ product }: ProductFormProps) {
//   const [name, setName] = useState(product?.name || "");
//   const [price, setPrice] = useState(product?.price || 0);
//   const [discount, setDiscount] = useState(product?.discount || 0);
//   const [stock, setStock] = useState(product?.stock || true);
//   const [description, setDescription] = useState(product?.description || "");
//   const [isActive, setIsActive] = useState(product?.is_active || true);
//   const [file, setFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const router = useRouter();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       let imageUrl = product?.image || "";

//       if (file) {
//         setIsUploading(true);
//         imageUrl = await UploadImage(file, "products");
//         setIsUploading(false);
//       }

//       const body = {
//         name,
//         price,
//         discount,
//         stock,
//         description,
//         is_active: isActive,
//         image: imageUrl,
//       };

//       const res = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
//         method: product ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error("Failed to save product");

//       toast({
//         title: "Success",
//         description: product ? "Product updated" : "Product created",
//       });

//       router.push("/admin/products");
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to save product", variant: "destructive" });
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//       setIsUploading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         {/* <CardHeader> */}
//           <CardTitle>{product ? "Edit" : "Create"} Product</CardTitle>
//           <CardDescription>{product ? "Update product info" : "Fill details to create product"}</CardDescription>
//         {/* </CardHeader> */}

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

//           <div className="space-y-2">
//             <Label>Discount</Label>
//             <Input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
//           </div>

//           <div className="space-y-2 flex items-center gap-4">
//             <Label>Stock</Label>
//             <select value={stock ? "in" : "out"} onChange={(e) => setStock(e.target.value === "in")}>
//               <option value="in">In Stock</option>
//               <option value="out">Out of Stock</option>
//             </select>
//           </div>

//           <div className="space-y-2 flex items-center gap-4">
//             <Label>Status</Label>
//             <select value={isActive ? "active" : "inactive"} onChange={(e) => setIsActive(e.target.value === "active")}>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <Label>Product Image</Label>
//             <input
//               type="file"
//               disabled={isSubmitting || isUploading}
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//             {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
//           </div>
//         </CardContent>

//         <CardFooter className="flex gap-2">
//           <Button type="submit" disabled={isSubmitting || isUploading || !name}>
//             {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : product ? "Update" : "Create"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadImage } from "@/lib/image-upload";

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount?: number;
    stock: boolean;
    description: string;
    is_active: boolean;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Properly Typed States
  const [name, setName] = useState<string>(product?.name ?? "");
  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [discount, setDiscount] = useState<number>(product?.discount ?? 0);
  const [stock, setStock] = useState<boolean>(product?.stock ?? true);
  const [description, setDescription] = useState<string>(
    product?.description ?? ""
  );
  const [isActive, setIsActive] = useState<boolean>(
    product?.is_active ?? true
  );
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = product?.image ?? "";

      if (file) {
        setIsUploading(true);
        imageUrl = await UploadImage(file, "products");
        setIsUploading(false);
      }

      const body = {
        name,
        price,
        discount,
        stock,
        description,
        is_active: isActive,
        image: imageUrl,
      };

      const res = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to save product");

      toast({
        title: "Success",
        description: product
          ? "Product updated successfully"
          : "Product created successfully",
      });

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardTitle className="px-6 pt-6">
          {product ? "Edit" : "Create"} Product
        </CardTitle>
        <CardDescription className="px-6">
          {product
            ? "Update product information"
            : "Fill details to create product"}
        </CardDescription>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price *</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <Label>Discount</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) =>
                setDiscount(Number(e.target.value))
              }
            />
          </div>

          {/* Stock */}
          <div className="space-y-2 flex items-center gap-4">
            <Label>Stock</Label>
            <select
              value={stock ? "in" : "out"}
              onChange={(e) =>
                setStock(e.target.value === "in")
              }
              className="border rounded px-3 py-2"
            >
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2 flex items-center gap-4">
            <Label>Status</Label>
            <select
              value={isActive ? "active" : "inactive"}
              onChange={(e) =>
                setIsActive(
                  e.target.value === "active"
                )
              }
              className="border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <input
              type="file"
              disabled={isSubmitting || isUploading}
              onChange={(e) =>
                setFile(e.target.files?.[0] ?? null)
              }
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                {file.name}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              isUploading ||
              !name
            }
          >
            {isUploading
              ? "Uploading..."
              : isSubmitting
              ? "Saving..."
              : product
              ? "Update"
              : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

