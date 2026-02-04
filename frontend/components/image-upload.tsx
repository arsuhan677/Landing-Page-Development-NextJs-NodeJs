"use client";

import { useRef, useState } from "react";

interface ImageUploadProps {
  label: string;
  value?: string;
  onFileSelected: (file: File | null) => void;
  disabled?: boolean;
}

export default function ImageUpload({ label, value, onFileSelected, disabled }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    onFileSelected(file);
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Choose Image
        </button>
        {preview && (
          <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded border" />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
