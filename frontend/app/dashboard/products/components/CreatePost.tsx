// "use client";

// import { useState } from "react";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function CreatePost() {
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     discount: "",
//     image: "",
//     description: "",
//     stock: true,
//     is_active: true,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post("http://localhost:5000/api/products", {
//         ...formData,
//         price: Number(formData.price),
//         discount: Number(formData.discount),
//       });

//       alert("✅ Product added successfully");

//       setFormData({
//         name: "",
//         price: "",
//         discount: "",
//         image: "",
//         description: "",
//         stock: true,
//         is_active: true,
//       });
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="max-w-xl mx-auto mt-10">
//       <CardHeader>
//         <CardTitle>Create Product</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Product Name */}
//           <div>
//             <Label>Product Name</Label>
//             <Input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <Label>Price</Label>
//             <Input
//               name="price"
//               type="number"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Discount */}
//           <div>
//             <Label>Discount</Label>
//             <Input
//               name="discount"
//               type="number"
//               value={formData.discount}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Image */}
//           <div>
//             <Label>Image URL</Label>
//             <Input
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <Label>Description</Label>
//             <Textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Stock Option */}
//           <div className="flex items-center gap-3">
//             <Checkbox
//               id="stock"
//               checked={formData.stock}
//               onCheckedChange={(checked) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   stock: Boolean(checked),
//                 }))
//               }
//             />
//             <Label
//               htmlFor="stock"
//               className={formData.stock ? "text-green-600" : "text-red-600"}
//             >
//               {formData.stock ? "In Stock" : "Out of Stock"}
//             </Label>
//           </div>

//           {/* Submit */}
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Saving..." : "Add Product"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("id"); // 👈 magic
  const isEditMode = Boolean(productId);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    image: "",
    description: "",
    stock: true,
    is_active: true,
  });

  // 🔹 Edit mode হলে data load করবে
  useEffect(() => {
    if (!productId) return;

    axios
      .get(`http://localhost:5000/api/products/${productId}`)
      .then((res) => {
        setFormData(res.data.data);
      });
  }, [productId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        // 🔁 UPDATE
        await axios.put(
          `http://localhost:5000/api/products/${productId}`,
          {
            ...formData,
            price: Number(formData.price),
            discount: Number(formData.discount),
          }
        );
        alert("✅ Product updated");
      } else {
        // ➕ CREATE
        await axios.post("http://localhost:5000/api/products", {
          ...formData,
          price: Number(formData.price),
          discount: Number(formData.discount),
        });
        alert("✅ Product created");
      }

      router.push("/dashboard/products");
    } catch (err) {
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>
          {isEditMode ? "Edit Product" : "Create Product"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Discount</Label>
            <Input
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input name="image" value={formData.image} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.stock}
              onCheckedChange={(v) =>
                setFormData((p) => ({ ...p, stock: Boolean(v) }))
              }
            />
            <Label>
              {formData.stock ? "In Stock" : "Out of Stock"}
            </Label>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

