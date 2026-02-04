"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/lib/image-upload";
import { UploadImage } from "@/lib/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
}

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    price: number;
    description: string;
    categoryId: number;
    category: Category;
    image: string | null;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [description, setDescription] = useState(product?.description || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId.toString() || "");
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  // fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = product?.image || "";

      if (file) {
        setIsUploading(true);
        imageUrl = await UploadImage(file, "products");
        setIsUploading(false);
      }

      const body = {
        name,
        price,
        description,
        categoryId: parseInt(categoryId),
        image: imageUrl,
      };

      const res = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast({
        title: "Success",
        description: product ? "Product updated" : "Product created",
      });

      router.push("/admin/products");
    } catch (error) {
      toast({ title: "Error", description: "Failed to save product", variant: "destructive" });
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{product ? "Edit" : "Create"} Product</CardTitle>
          <CardDescription>{product ? "Update product info" : "Fill details to create product"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Price *</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </div>

          <ImageUpload
            label="Product Image"
            value={product?.image || ""}
            disabled={isUploading || isSubmitting}
            onFileSelected={setFile}
          />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={!name || isSubmitting || isUploading}>
            {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : product ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
