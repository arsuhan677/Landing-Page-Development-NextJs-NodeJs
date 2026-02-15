// "use client";

// import React, { useState } from "react";
// import { api } from "@/utils/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CardContent } from "@/components/ui/card";
// import { useRouter } from "next/navigation";

// interface ProductFormData {
//   name: string;
//   price: number | string;
//   discount?: number | string;
//   image: string;
//   description: string;
//   stock: boolean;
//   is_active: boolean;
// }

// export default function CreateProduct() {
//   const [formData, setFormData] = useState<ProductFormData>({
//     name: "",
//     price: "",
//     discount: "",
//     image: "",
//     description: "",
//     stock: true,
//     is_active: true,
//   });

//   const [loading, setLoading] = useState(false);
//   const router = useRouter()

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (
//     field: "stock" | "is_active",
//     value: boolean,
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/products", {
//         ...formData,
//         price: Number(formData.price),
//         discount: formData.discount ? Number(formData.discount) : 0,
//       });

//       alert("Product added successfully!");
//       router.push("/dashboard/products");

//       setFormData({
//         name: "",
//         price: "",
//         discount: "",
//         image: "",
//         description: "",
//         stock: true,
//         is_active: true,
//       });
//     } catch (error: any) {
//       console.error("Failed to add product:", error);
//       alert(error?.response?.data?.message || "Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CardContent>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Product Name</Label>
//             <Input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
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
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Discount</Label>
//             <Input
//               name="discount"
//               type="number"
//               value={formData.discount ?? ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <Label>Image URL</Label>
//             <Input
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <Label>Description</Label>
//           <Textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Stock */}
//         <div className="flex items-center gap-3">
//           <Checkbox
//             id="stock"
//             checked={formData.stock}
//             onCheckedChange={(checked) =>
//               handleCheckboxChange("stock", Boolean(checked))
//             }
//           />
//           <Label
//             htmlFor="stock"
//             className={formData.stock ? "text-green-600" : "text-red-600"}
//           >
//             {formData.stock ? "In Stock" : "Out of Stock"}
//           </Label>
//         </div>

//         {/* BTNN */}
//         <Button type="submit" disabled={loading} className="w-full">
//           {loading ? "Creating..." : "Create Product"}
//         </Button>
//       </form>
//     </CardContent>

// );
// }


"use client";

import React, { useState } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface ProductFormData {
  name: string;
  price: string;
  discount: string;
  image: string;
  description: string;
  stock: boolean;
  is_active: boolean;
}

const initialFormState: ProductFormData = {
  name: "",
  price: "",
  discount: "",
  image: "",
  description: "",
  stock: true,
  is_active: true,
};

export default function CreateProduct() {
  const [formData, setFormData] =
    useState<ProductFormData>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Handle text & number inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (
    field: "stock" | "is_active",
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        discount: formData.discount
          ? Number(formData.discount)
          : 0,
      });

      alert("Product created successfully!");

      setFormData(initialFormState);

      router.push("/dashboard/products");
    } catch (error: any) {
      console.error("Create product error:", error);
      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Product Name *</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Price *</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Discount & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label>Image URL *</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Stock Checkbox */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="stock"
            checked={formData.stock}
            onCheckedChange={(checked) =>
              handleCheckboxChange(
                "stock",
                Boolean(checked)
              )
            }
          />
          <Label
            htmlFor="stock"
            className={`font-medium ${
              formData.stock
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formData.stock
              ? "In Stock"
              : "Out of Stock"}
          </Label>
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) =>
              handleCheckboxChange(
                "is_active",
                Boolean(checked)
              )
            }
          />
          <Label
            htmlFor="is_active"
            className="font-medium"
          >
            Active Product
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Creating Product..."
            : "Create Product"}
        </Button>
      </form>
    </CardContent>
  );
}



